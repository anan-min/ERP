import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoices/:id', component: InvoiceDetailsComponent },

  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },

  { path: 'payments', component: PaymentsComponent },
  { path: 'payments/:id', component: PaymentDetailsComponent },

  { path: 'reports', component: ReportsComponent },

  { path: 'dashboard', component: DashboardComponent },
];
