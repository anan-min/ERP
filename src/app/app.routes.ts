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
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { InsertComponent } from './components/insert/insert.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customers',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'payments/:id',
    component: PaymentDetailsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'dashboard/insert',
    component: InsertComponent,
    canActivate: [AuthGuardService],
  },
];
