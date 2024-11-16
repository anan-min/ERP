import { Component } from '@angular/core';
import { PaymentsComponent } from './components/payments/payments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentsComponent],
  template: `
    <div>
      <app-payments></app-payments>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ERP';
}
