import { prisma } from './db';

export interface StockDeductionItem {
  productId: string;
  quantity: number;
}

export async function deductStockAtomic(
  items: StockDeductionItem[],
  action: string, // 'PURCHASE' | 'SALE' | 'POS_SALE' | 'ADJUSTMENT' | 'RETURN' | 'DAMAGE'
  referenceId?: string,
  userId?: string
) {
  return await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      if (product.currentStock < item.quantity) {
        throw new Error(
          `Insufficient stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.currentStock}.`
        );
      }

      const previousStock = product.currentStock;
      const newStock = previousStock - item.quantity;
      const status = newStock === 0 ? 'OUT_OF_STOCK' : product.status;

      // Update product stock
      await tx.product.update({
        where: { id: product.id },
        data: {
          currentStock: newStock,
          status,
        },
      });

      // Record inventory transaction log
      await tx.inventoryLog.create({
        data: {
          productId: product.id,
          action,
          quantityChange: -item.quantity,
          previousStock,
          newStock,
          referenceId: referenceId || null,
          createdById: userId || null,
          notes: `Stock change via ${action}`,
        },
      });

      // Create Low-Stock notification if stock falls below minStock
      if (newStock <= product.minStock) {
        const admins = await tx.user.findMany({
          where: { role: { in: ['SUPER_ADMIN', 'MANAGER'] } },
        });

        for (const adminUser of admins) {
          await tx.notification.create({
            data: {
              userId: adminUser.id,
              title: newStock === 0 ? `OUT OF STOCK: ${product.name}` : `LOW STOCK ALERT: ${product.name}`,
              message: `Current stock of ${product.name} is now ${newStock} (Minimum threshold: ${product.minStock}).`,
              type: newStock === 0 ? 'OUT_OF_STOCK' : 'LOW_STOCK',
            },
          });
        }
      }
    }
  });
}
