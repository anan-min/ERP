import { Component, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { OrderService } from '../../../services/order/order.service';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { InvoiceStatus } from '../../../modules/data';

@Component({
  selector: 'app-invoice-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <form [formGroup]="insertForm" (ngSubmit)="onSubmit()">
    <h1>Insert New Invoices Details</h1>

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
      />
    </div>

    <div class="form-group">
      <label for="current_time">Current Time:</label>
      <div>{{ currentTime }}</div>
    </div>

    <button type="submit" class="btn btn-primary">Save Changes</button>
  </form>`,
  styleUrl: './invoice-insert.component.css',
})
export class InvoiceInsertComponent {
  constructor() {}

  customerService = inject(CustomerService);
  orderService = inject(OrderService);
  invoiceService = inject(InvoiceService);
  private router: Router = inject(Router);

  insertForm = new FormGroup({
    customer_id: new FormControl(1),
    order_id: new FormControl(1),
    total_amount: new FormControl(0),
    status: new FormControl(InvoiceStatus.PENDING),
    due_date: new FormControl(),
    discount: new FormControl(0),
    notes: new FormControl(''),
  });

  validCustomersIDs: Number[] = [];
  validOrdersIDs: Number[] = [];
  currentTime = this.formatDate(new Date());

  invoiceStatues = [
    InvoiceStatus.PENDING,
    InvoiceStatus.PAID,
    InvoiceStatus.OVERDUE,
    InvoiceStatus.CANCELLED,
  ];

  /*         
  INSERT INTO invoices (customer_id, order_id, total_amount, created_at, updated_at, status, due_date, discount, notes)
  VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6, $7, $8);
  */

  async ngOnInit() {
    this.validCustomersIDs = await this.customerService.getAllCustomerIds();
    this.validOrdersIDs = await this.orderService.getAllOrderIds();
    this.insertForm.patchValue({
      customer_id: this.validOrdersIDs[0]?.valueOf() ?? 1,
      order_id: this.validOrdersIDs[0]?.valueOf() ?? 1,
    });
  }

  async onSubmit() {
    if (this.insertForm.valid) {
      console.log(this.insertForm.value);
      await this.invoiceService.insertInvoice({
        invoice_id: 0,
        customer_id: this.insertForm.value.customer_id ?? 0,
        order_id: this.insertForm.value.order_id ?? 0,
        total_amount: this.insertForm.value.total_amount ?? 0,
        status: this.insertForm.value.status ?? InvoiceStatus.PENDING,
        due_date: new Date(this.insertForm.value.due_date ?? ''),
        discount: this.insertForm.value.discount ?? 0,
        notes: this.insertForm.value.notes ?? '',
        created_at: new Date(),
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
