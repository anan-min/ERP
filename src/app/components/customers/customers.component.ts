import { Component, inject } from '@angular/core';
import { Customer2Service } from '../../services/customer/customer2.service';
import { Customer } from '../../modules/data';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customerService = inject(Customer2Service);
  customers: Customer[] = [];

  constructor() {}
}
