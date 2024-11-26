import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from '../../services/customer/customer.service';
import { OrderService } from '../../services/order/order.service';
import { Order, OrderStatus } from '../../modules/data';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Edit Customer [{{ order?.order_id }}] Details</h1>
      <div class="form-group">
        <label for="order_id">Order ID:</label>
        <div>{{ order?.order_id }}</div>
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
        <label for="updated_at">Updated At:</label>
        <div>{{ order?.updated_at }}</div>
      </div>

      <div class="form-group">
        <label for="created_at">Updated At:</label>
        <div>{{ order?.created_at }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  customerServices = inject(CustomerService);
  orderServices = inject(OrderService);

  validCustomersIDs: Number[] = [];
  order: Order | undefined;
  orderID = -1;

  editForm = new FormGroup({
    customer_id: new FormControl(0),
    order_date: new FormControl(new Date()),
    total_amount: new FormControl(0),
    status: new FormControl(OrderStatus.COMPLETED),
  });

  orderStatuses = [
    OrderStatus.PENDING,
    OrderStatus.IN_PROGRESS,
    OrderStatus.COMPLETED,
    OrderStatus.CANCELLED,
  ];

  async ngOnInit() {
    this.validCustomersIDs = await this.customerServices.getCustomerIds();

    this.editForm.patchValue({
      order_date: this.order?.order_date ?? new Date(),
      customer_id: this.order?.customer_id ?? 0,
      total_amount: this.order?.total_amount ?? 0,
      status: this.order?.status ?? OrderStatus.COMPLETED,
    });
  }

  constructor() {
    this.orderID = Number(this.route.snapshot.paramMap.get('id'));
    this.orderServices.getOrder(this.orderID).then((order) => {
      this.order = order;
    });
  }

  onSubmit() {}
}
