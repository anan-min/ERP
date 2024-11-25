import { Injectable } from '@angular/core';
import { Payment, PaymentStatus } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}
  url = 'http://localhost:3000/payments';

  async getAllPayments(): Promise<Payment[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? null;

    return data.map((payment: any) => this.parsePayment(payment));
  }

  async getPayment(id: number): Promise<Payment> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json()) ?? null;
    return this.parsePayment(data) ?? null;
  }

  async deletePayment(id: number): Promise<void> {
    const data = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }

  private parsePayment(payment: any): Payment {
    return {
      payment_id: payment.payment_id ?? 0,
      invoice_id: payment.invoice_id,
      payment_date: new Date(payment.payment_date),
      payment_amount: payment.payment_amount,
      payment_method: payment.payment_method,
      status: this.mapStatus(payment.status),
      created_at: new Date(payment.created_at),
      updated_at: new Date(payment.updated_at),
    };
  }

  private mapStatus(status: string): PaymentStatus {
    switch (status) {
      case 'pending':
        return PaymentStatus.PENDING;
      case 'paid':
        return PaymentStatus.PAID;
      case 'fail':
        return PaymentStatus.FAIL;
      default:
        return PaymentStatus.PENDING;
    }
  }
}
