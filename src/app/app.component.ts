import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
      <a [routerLink]="['/']" class="home-button">Home</a>
      <ul class="nav-list">
        <li><a [routerLink]="['/dashboard']" class="nav-link">View</a></li>
        <li>
          <a [routerLink]="['/dashboard/insert']" class="nav-link">Insert</a>
        </li>
        <li *ngIf="isLoggedIn$ | async">
          <button (click)="logout()">Logout</button>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn$ = this.authService.isLoggedIn$;

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
