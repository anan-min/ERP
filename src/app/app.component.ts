import { Component } from '@angular/core';
import { CustomersComponent } from './components/customers/customers.component';

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
