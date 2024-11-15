enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
  total_amount: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}
