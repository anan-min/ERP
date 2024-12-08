import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { OrderService } from '../../../services/order/order.service';

import { Order, OrderStatus } from '../../../modules/data';

@Component({
  selector: 'app-order-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<form [formGroup]="insertForm" (ngSubmit)="onSubmit()">
    <h1>Insert New Order Details</h1>

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
      <label for="total_amount">Total Amount:</label>
      <input
        id="total_amount"
        type="number"
        class="form-control"
        formControlName="total_amount"
        placeholder="Enter order's total amount"
      />
    </div>

    <div class="form-group">
      <label for="status">Order Status:</label>
      <select id="status" class="form-control" formControlName="status">
        <option value="" disabled>Select Category</option>
        <option *ngFor="let status of orderStatuses" [value]="status">
          {{ status }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="current_time">Current Time:</label>
      <div>{{ currentTime }}</div>
    </div>

    <button type="submit" class="btn btn-primary">Save Changes</button>
  </form>`,
  styleUrl: './order-insert.component.css',
})
export class OrderInsertComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  customerServices = inject(CustomerService);
  orderServices = inject(OrderService);

  validCustomersIDs: Number[] = [];
  currentTime = this.formatDate(new Date());

  insertForm = new FormGroup({
    customer_id: new FormControl(0),
    total_amount: new FormControl(0),
    status: new FormControl(OrderStatus.PENDING),
  });

  orderStatuses = [
    OrderStatus.PENDING,
    OrderStatus.IN_PROGRESS,
    OrderStatus.COMPLETED,
    OrderStatus.CANCELLED,
  ];

  constructor() {}

  async ngOnInit() {
    this.validCustomersIDs = await this.customerServices.getAllCustomerIds();
    this.insertForm.patchValue({
      customer_id: this.validCustomersIDs[0]?.valueOf() ?? 1,
      total_amount: 0,
      status: OrderStatus.PENDING,
    });
  }

  async onSubmit() {
    if (this.insertForm.valid) {
      await this.orderServices.insertOrder({
        order_id: 0,
        customer_id: this.insertForm.value.customer_id ?? 0,
        order_date: new Date(),
        total_amount: this.insertForm.value.total_amount ?? 0,
        status: this.insertForm.value.status ?? OrderStatus.COMPLETED,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    this.router.navigate(['/orders']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
