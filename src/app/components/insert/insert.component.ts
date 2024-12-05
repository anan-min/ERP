import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerInsertComponent } from './customer-insert/customer-insert.component';
import { InvoiceInsertComponent } from './invoice-insert/invoice-insert.component';
import { OrderInsertComponent } from './order-insert/order-insert.component';
import { PaymentInsertComponent } from './payment-insert/payment-insert.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ReportInsertComponent } from './report-insert/report-insert.component';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [
    CustomerInsertComponent,
    OrderInsertComponent,
    InvoiceInsertComponent,
    PaymentInsertComponent,
    ProductInsertComponent,
    ReportInsertComponent,
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
      <app-customer-insert></app-customer-insert>
    </div>
    <div *ngIf="selectedComponent === 'invoice'">
      <app-invoice-insert></app-invoice-insert>
    </div>
    <div *ngIf="selectedComponent === 'order'">
      <app-order-insert></app-order-insert>
    </div>
    <div *ngIf="selectedComponent === 'payment'">
      <app-payment-insert></app-payment-insert>
    </div>
    <div *ngIf="selectedComponent === 'product'">
      <app-product-insert></app-product-insert>
    </div>
    <div *ngIf="selectedComponent === 'report'">
      <app-report-insert></app-report-insert>
    </div>
  `,
  styleUrl: './insert.component.css',
})
export class InsertComponent {
  selectedComponent: string = 'customer';

  onSelectComponent(event: any): void {
    this.selectedComponent = event.target.value;
  }
}
