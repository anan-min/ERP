import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer/customer.service';
import { OrderService } from '../../services/order/order.service';
import { InvoiceService } from '../../services/invoice/invoice.service';

import { Invoice, InvoiceStatus } from '../../modules/data';

import { formatDate } from '../../utils/date_utils';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Edit Invoices Details</h1>
      <div class="form-group">
        <label for="invoice_id">InvoiceID:</label>
        <div>{{ invoice?.invoice_id }}</div>
      </div>

      <div class="form-group">
        <label for="customer_id">Customer ID:</label>
        <select
          id="customer_id"
          class="form-control"
          formControlName="customer_id"
        >
          <option value="" disabled>Select Customer ID</option>
          <option
            *ngFor="let customerId of validCustomersIDs"
            [value]="customerId"
          >
            {{ customerId }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="order_id">Order ID:</label>
        <select id="order_id" class="form-control" formControlName="order_id">
          <option value="" disabled>Select Order ID</option>
          <option *ngFor="let orderId of validOrdersIDs" [value]="orderId">
            {{ orderId }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="total_amount">Total Amount:</label>
        <input
          id="total_amount"
          type="number"
          class="form-control"
          formControlName="total_amount"
          placeholder="Enter Invoice's total amount"
        />
      </div>

      <div class="form-group">
        <label for="status">Invoice Status:</label>
        <select id="status" class="form-control" formControlName="status">
          <option value="" disabled>Select Invoice Status</option>
          <option *ngFor="let status of invoiceStatues" [value]="status">
            {{ status }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="discount">Discount:</label>
        <input
          id="discount"
          type="number"
          class="form-control"
          formControlName="discount"
          placeholder="Enter Invoice's discount"
        />
      </div>

      <div class="form-group">
        <label for="notes">Notes:</label>
        <input
          id="notes"
          type="text"
          class="form-control"
          formControlName="notes"
          placeholder="Enter Invoice's notes"
        />
      </div>

      <div class="form-group">
        <label for="due_date">Due Date:</label>
        <input
          id="due_date"
          type="date"
          class="form-control"
          formControlName="due_date"
          placeholder="{invoice?.due_date}"
        />
      </div>

      <div class="form-group">
        <label for="updated_at">Updated At:</label>
        <div>{{ formatDate(invoice?.updated_at) }}</div>
      </div>

      <div class="form-group">
        <label for="created_at">Created At:</label>
        <div>{{ formatDate(invoice?.created_at) }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent {
  customerService = inject(CustomerService);
  orderService = inject(OrderService);
  invoiceService = inject(InvoiceService);
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  invoiceID = -1;

  validCustomersIDs: Number[] = [];
  validOrdersIDs: Number[] = [];
  invoice: Invoice | undefined;

  invoiceStatues = [
    InvoiceStatus.PENDING,
    InvoiceStatus.PAID,
    InvoiceStatus.OVERDUE,
    InvoiceStatus.CANCELLED,
  ];

  editForm = new FormGroup({
    customer_id: new FormControl(0),
    order_id: new FormControl(0),
    total_amount: new FormControl(0),
    status: new FormControl(InvoiceStatus.PENDING),
    due_date: new FormControl(''),
    discount: new FormControl(0),
    notes: new FormControl(''),
  });

  constructor() {
    this.invoiceID = Number(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    this.invoice = await this.invoiceService.getInvoice(this.invoiceID);
    this.validCustomersIDs = await this.customerService.getAllCustomerIds();
    this.validOrdersIDs = await this.orderService.getAllOrderIds();

    console.log(this.validOrdersIDs);

    this.editForm.patchValue({
      customer_id: this.invoice?.customer_id ?? 0,
      order_id: this.invoice?.order_id ?? 0,
      total_amount: this.invoice?.total_amount ?? 0,
      status: this.invoice?.status ?? InvoiceStatus.PENDING,
      due_date: this.formatDate(this.invoice.due_date),
      discount: this.invoice?.discount ?? 0,
      notes: this.invoice?.notes ?? '',
    });
  }

  async onSubmit() {
    if (this.editForm.valid) {
      await this.invoiceService.editInvoice({
        invoice_id: this.invoiceID,
        customer_id: this.editForm.value.customer_id ?? 0,
        order_id: this.editForm.value.order_id ?? 0,
        total_amount: this.editForm.value.total_amount ?? 0,
        status: this.editForm.value.status ?? InvoiceStatus.PENDING,
        due_date: new Date(this.editForm.value.due_date ?? ''),
        discount: this.editForm.value.discount ?? 0,
        notes: this.editForm.value.notes ?? '',
        created_at: this.invoice?.created_at ?? new Date(),
        updated_at: new Date(),
      });
    }

    this.router.navigate(['/invoices']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  }
}
