enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

interface Invoice {
  invoice_id: number;
  customer_id: number;
  order_id: number;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  status: InvoiceStatus;
  due_date: Date;
  discount?: number;
  notes?: string;
}
