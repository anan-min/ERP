import { Component, inject } from '@angular/core';
import { Customer2Service } from '../../services/customer/customer2.service';
import { Customer } from '../../modules/data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Customers List</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
            <td>{{ customer.customer_id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone_number }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.created_at }}</td>
            <td>{{ customer.updated_at }}</td>
            <td>
              <a [routerLink]="['/customers', customer.customer_id]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deleteCustomer(customer.customer_id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customerService = inject(Customer2Service);
  customers: Customer[] = [];

  constructor() {
    this.loadCustomers();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customerService.getAllCustomers().then((customers) => {
      this.customers = customers;
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).then(() => {
      this.loadCustomers();
    });
  }
}
