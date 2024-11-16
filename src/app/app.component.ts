import { Component } from '@angular/core';
import { OrdersComponent } from './components/orders/orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrdersComponent],
  template: `
    <div>
      <app-orders></app-orders>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
}
