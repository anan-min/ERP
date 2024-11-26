import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentService } from '../../services/payment/payment.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { Payment, PaymentStatus } from '../../modules/data';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Edit Payment Details</h1>
      <div class="form-group">
        <label for="payment_id">Payment ID:</label>
        <div>{{ payment?.payment_id }}</div>
      </div>

      <div class="form-group">
        <label for="invoice_id">Invoice ID:</label>
        <select
          id="invoice_id"
          class="form-control"
          formControlName="invoice_id"
        >
          <option value="" disabled>Select Customer ID</option>
          <option
            *ngFor="let InvoiceId of validInvoicesIDs"
            [value]="InvoiceId"
          >
            {{ InvoiceId }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="payment_amount">Total Amount:</label>
        <input
          id="payment_amount"
          type="number"
          class="form-control"
          formControlName="payment_amount"
          placeholder="Enter Payment's amount"
        />
      </div>

      <div class="form-group">
        <label for="payment_method">Payment Method: </label>
        <input
          id="payment_method"
          type="string"
          class="form-control"
          formControlName="payment_method"
          placeholder="Enter Payment's method"
        />
      </div>

      <div class="form-group">
        <label for="status">Payment Status:</label>
        <select id="status" class="form-control" formControlName="status">
          <option value="" disabled>Select Payment Status</option>
          <option *ngFor="let status of paymentStatues" [value]="status">
            {{ status.toUpperCase() }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="payment_date">Paymentdate:</label>
        <input
          id="payment_date"
          type="date"
          class="form-control"
          formControlName="payment_date"
          placeholder="{payment?.payment_date}"
        />
      </div>

      <div class="form-group">
        <label for="updated_at">Updated At:</label>
        <div>{{ this.formatDate(payment?.updated_at) }}</div>
      </div>

      <div class="form-group">
        <label for="created_at">Created At:</label>
        <div>{{ this.formatDate(payment?.created_at) }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,

  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  paymentService = inject(PaymentService);
  invoiceService = inject(InvoiceService);

  payment: Payment | undefined;
  paymentID = -1;
  validInvoicesIDs: Number[] = [];

  paymentStatues = [
    PaymentStatus.PENDING,
    PaymentStatus.PAID,
    PaymentStatus.FAIL,
  ];

  editForm = new FormGroup({
    invoice_id: new FormControl(0),
    payment_date: new FormControl(''),
    payment_amount: new FormControl(0),
    payment_method: new FormControl(''),
    status: new FormControl(PaymentStatus.PENDING),
  });

  constructor() {
    this.paymentID = Number(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    this.payment = await this.paymentService.getPayment(this.paymentID);
    this.validInvoicesIDs = await this.invoiceService.getAllInvoiceIds();

    this.editForm.patchValue({
      invoice_id: this.payment?.invoice_id ?? 0,
      payment_date: this.formatDate(this.payment?.payment_date),
      payment_amount: this.payment?.payment_amount ?? 0,
      payment_method: this.payment?.payment_method ?? '',
      status: this.payment?.status ?? PaymentStatus.PENDING,
    });
  }

  async onSubmit() {
    console.log('invoice id', this.editForm.value.invoice_id);
    if (this.editForm.valid) {
      await this.paymentService.updatePayment({
        payment_id: this.paymentID,
        invoice_id: this.editForm.value.invoice_id ?? 0,
        payment_amount: this.editForm.value.payment_amount ?? 0,
        payment_method: this.editForm.value.payment_method ?? '',
        status: this.editForm.value.status ?? PaymentStatus.PENDING,
        payment_date: new Date(this.editForm.value.payment_date ?? ''),
        created_at: this.payment?.created_at ?? new Date(),
        updated_at: new Date(),
      });
    }
    this.router.navigate(['/payments']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  }
}
