import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
};

const ProductStatus = {
  ACTIVE: 'ACTIVE',
  DRAFT: 'DRAFT',
  HIDDEN: 'HIDDEN',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
};

const InventoryAction = {
  PURCHASE: 'PURCHASE',
  SALE: 'SALE',
  POS_SALE: 'POS_SALE',
  ADJUSTMENT: 'ADJUSTMENT',
  RETURN: 'RETURN',
  DAMAGE: 'DAMAGE',
};

const OrderType = {
  ONLINE: 'ONLINE',
  POS: 'POS',
};

const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  READY: 'READY',
  OUT_OF_DELIVERY: 'OUT_OF_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
};

const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED',
};

const PaymentMethod = {
  CASH: 'CASH',
  UPI: 'UPI',
  CARD: 'CARD',
  NET_BANKING: 'NET_BANKING',
};

async function main() {
  console.log('Seeding store billing and inventory database with Sri Chamundi Stores...');

  // 1. Store Settings
  await prisma.storeSetting.upsert({
    where: { id: 'default' },
    update: {
      storeName: 'Sri Chamundi Stores & Tea Stall',
      storeAddress: 'Main Highway Road, Sri Chamundi Stores, Tamil Nadu',
      storePhone: '+91 98655 70413',
      storeEmail: 'support@srichamundistores.in',
    },
    create: {
      id: 'default',
      storeName: 'Sri Chamundi Stores & Tea Stall',
      storeAddress: 'Main Highway Road, Sri Chamundi Stores, Tamil Nadu',
      storePhone: '+91 98655 70413',
      storeEmail: 'support@srichamundistores.in',
      gstin: '33AAAAA0000A1Z5',
      currency: '₹',
      defaultGst: 18.0,
      lowStockThreshold: 5,
      showExactStockToCustomers: true,
    },
  });

  console.log('Updated store settings to Sri Chamundi Stores');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
