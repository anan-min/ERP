import { Component } from '@angular/core';
import { CustomersComponent } from '../customers/customers.component';
import { InvoicesComponent } from '../invoices/invoices.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/reports.component';
import { PaymentsComponent } from '../payments/payments.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CustomersComponent,
    InvoicesComponent,
    OrdersComponent,
    PaymentsComponent,
    ProductsComponent,
    ReportsComponent,
    CommonModule,
  ],
  template: `
    <div class="container">
      <select (change)="onSelectComponent($event)">
        <option value="customer">Customer</option>
        <option value="invoice">Invoice</option>
        <option value="order">Order</option>
        <option value="payment">Payment</option>
        <option value="product">Product</option>
        <option value="report">Report</option>
      </select>
    </div>
    <div *ngIf="selectedComponent === 'customer'">
      <app-customers></app-customers>
    </div>
    <div *ngIf="selectedComponent === 'invoice'">
      <app-invoices></app-invoices>
    </div>
    <div *ngIf="selectedComponent === 'order'">
      <app-orders></app-orders>
    </div>
    <div *ngIf="selectedComponent === 'payment'">
      <app-payments></app-payments>
    </div>
    <div *ngIf="selectedComponent === 'product'">
      <app-products></app-products>
    </div>
    <div *ngIf="selectedComponent === 'report'">
      <app-reports></app-reports>
    </div>
  `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  selectedComponent: string = 'customer';

  onSelectComponent(event: any): void {
    this.selectedComponent = event.target.value;
  }
}
