enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAIL = 'fail',
}

interface Payment {
  payment_id: number;
  invoice_id: number;
  payment_date: Date;
  payment_amount: number;
  payment_method: Date;
  status: Date;
  created_at: Date;
  updated_at: Date;
}
