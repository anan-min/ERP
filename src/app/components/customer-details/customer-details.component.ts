import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [],
  template: ` <p>customer-details works! id: {{ customerID }}</p> `,
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  customerID = -1;
  constructor() {
    this.customerID = Number(this.route.snapshot.paramMap.get('id'));
  }
}
