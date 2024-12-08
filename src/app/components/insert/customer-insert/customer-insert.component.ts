import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Enter New Customer Details</h1>
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          class="form-control"
          formControlName="name"
          placeholder="Enter customer's name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="text"
          class="form-control"
          formControlName="email"
          placeholder="Enter customer's email"
        />
      </div>

      <div class="form-group">
        <label for="phone_number">Phone Number:</label>
        <input
          id="phone_number"
          type="text"
          class="form-control"
          formControlName="phone_number"
          placeholder="Enter customer's phone number"
        />
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <textarea
          id="address"
          class="form-control"
          formControlName="address"
          placeholder="Enter customer's address"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="current_time">Current Time:</label>
        <div>{{ current_date }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Create new Customer</button>
    </form>
  `,
  styleUrl: './customer-insert.component.css',
})
export class CustomerInsertComponent {
  // name email phone_number address create_at updated_at
  customerService = inject(CustomerService);
  current_date = new Date();
  private router: Router = inject(Router);

  editForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
  });

  async onSubmit() {
    if (this.editForm.valid) {
      console.log('create new customer clicked');
      console.log("ediform value", this.editForm.value);
      await this.customerService.insertCustomer({
        customer_id: 0,
        name: this.editForm.value.name ?? '',
        email: this.editForm.value.email ?? '',
        phone_number: this.editForm.value.phone_number ?? '',
        address: this.editForm.value.address ?? '',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    this.router.navigate(['/customers']);
  }
}
