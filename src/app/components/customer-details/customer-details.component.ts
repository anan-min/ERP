import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../modules/data';
import { CustomerService } from '../../services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Edit Customer [{{ customer?.customer_id }}] Details</h1>
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
          type="email"
          class="form-control"
          formControlName="email"
          placeholder="Enter customer's email"
        />
      </div>

      <div class="form-group">
        <label for="phone_number">Phone Number:</label>
        <input
          id="phone_number"
          type="tel"
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

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent {
  customerService = inject(CustomerService);
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  customer: Customer | undefined;

  editForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
  });

  customerID = -1;
  constructor() {
    this.customerID = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(this.customerID).then((customer) => {
      this.customer = customer;
      this.editForm.patchValue({
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        address: customer.address,
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.customerService
        .updateCustomer({
          customer_id: this.customerID,
          name: this.editForm.value.name ?? '',
          email: this.editForm.value.email ?? '',
          phone_number: this.editForm.value.phone_number ?? '',
          address: this.editForm.value.address ?? '',
          created_at: this.customer?.created_at ?? new Date(),
          updated_at: new Date(),
        })
        .then((customer) => {
          this.customer = customer;
        });
    }

    this.router.navigate(['/customers']);
  }
}
