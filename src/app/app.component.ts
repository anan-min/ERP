import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/orders']">orders </a>
    <a [routerLink]="['/invoices']">invoices </a>
    <a [routerLink]="['/customers']">customers </a>
    <a [routerLink]="['/payments']">payments </a>
    <a [routerLink]="['/orders']">orders </a>
    <a [routerLink]="['/orders', 100]">
      orders 100
    </a>
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
