import { Component } from '@angular/core';
import { InvoicesComponent } from '../app/components/invoices/invoices.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoicesComponent],
  template: `
    <div>
      <app-invoices></app-invoices>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
}
