export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAIL = 'fail',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
}

export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export interface Invoice {
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

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
  total_amount: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  payment_id: number;
  invoice_id: number;
  payment_date: Date;
  payment_amount: number;
  payment_method: PaymentStatus;
  status: PaymentStatus;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  product_id: number;
  name: string;
  description?: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface Report {
  report_id: number;
  report_name: string;
  report_data: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  user_id: number;
  username: string;
  password: string;
  email: string;
  phone_number?: string;
  status: UserStatus;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}
