import { Component } from '@angular/core';
import { CustomersComponent } from '../customers/customers.component';
import { InvoicesComponent } from '../invoices/invoices.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CustomersComponent,
    InvoicesComponent,
    OrdersComponent,
    ProductsComponent,
  ],
  template: `
    <div>
      <app-customers></app-customers>
      <app-invoices></app-invoices>
      <app-orders></app-orders>
      <app-products></app-products>
    </div>
  `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
