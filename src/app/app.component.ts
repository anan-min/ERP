import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <ul class="nav-list">
        <li><a [routerLink]="['/orders']" class="nav-link">Orders</a></li>
        <li><a [routerLink]="['/invoices']" class="nav-link">Invoices</a></li>
        <li><a [routerLink]="['/customers']" class="nav-link">Customers</a></li>
        <li><a [routerLink]="['/payments']" class="nav-link">Payments</a></li>
        <li><a [routerLink]="['/products']" class="nav-link">Products</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
  isLoggedIn: boolean = false;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
