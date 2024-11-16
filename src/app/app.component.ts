import { Component } from '@angular/core';
import { InvoicesComponent } from '../app/components/invoices/invoices.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomersComponent],
  template: `
    <div>
      <app-customers></app-customers>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
}
