import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order } from '../../modules/data';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Order Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Status</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{ order.order_id }}</td>
            <td>
              <a [routerLink]="['/customers', order.customer_id]">
                {{ order.customer_id }}
              </a>
            </td>
            <td>{{ order.total_amount }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ order.updated_at }}</td>
            <td>{{ order.status }}</td>
            <td>
              <a [routerLink]="['/orders', order.order_id]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deleteOrder(order.order_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orderService = inject(OrderService);
  orders: Order[] = [];

  async ngOnInit() {
    this.loadOrders();
  }

  async loadOrders() {
    this.orders = await this.orderService.getAllOrders();
    this.orders.sort((a, b) => a.order_id - b.order_id);
  }

  async deleteOrder(id: number) {
    await this.orderService.deleteOrder(id).then(() => {
      this.loadOrders();
    });
  }
}
