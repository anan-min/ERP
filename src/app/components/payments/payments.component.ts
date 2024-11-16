import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Invoice, Payment, PaymentStatus } from '../../modules/data';
import { Payment2Service } from '../../services/payment/payment2.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Payments List</h2>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Invoice ID</th>
            <th>Payment Date</th>
            <th>Payment Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At/th></th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let payment of payments">
            <td>{{ payment.payment_id }}</td>
            <td>
              <a [routerLink]="['/invoice-detail', payment.invoice_id]">
                {{ payment.invoice_id }}
              </a>
            </td>
            <td>{{ payment.payment_date }}</td>
            <td>{{ payment.payment_amount }}</td>
            <td>{{ payment.payment_method }}</td>
            <td>{{ payment.status }}</td>
            <td>{{ payment.created_at }}</td>
            <td>{{ payment.updated_at }}</td>
            <td>
              <a [routerLink]="['/payment-detail', payment.payment_id]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deletePayment(payment.payment_id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  url = 'http://localhost:3000/payments';
  payments: Payment[] = [];
  paymentService = inject(Payment2Service);

  constructor() {}
  ngOnInit(): void {
    this.loadPayments();
  }

  private loadPayments(): void {
    this.paymentService.getAllPayments().then((payments) => {
      this.payments = payments;
    });
  }

  deletePayment(id: number) {
    this.paymentService.deletePayment(id).then(() => {
      this.loadPayments();
    });
  }
}
