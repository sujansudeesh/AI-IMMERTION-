export interface InvoiceItem {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  gstRate: number;
  totalPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  issueDate: string;
  storeInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    gstin: string;
  };
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  discountTotal: number;
  gstTotal: number;
  deliveryFee: number;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: string;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}
