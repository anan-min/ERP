import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        <label for="name">Phone Number:</label>
        <input
          id="phone_number"
          type="text"
          class="form-control"
          formControlName="name"
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

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,
  styleUrl: './customer-insert.component.css',
})
export class CustomerInsertComponent {
  // name email phone_number address create_at updated_at
  current_date = new Date();

  editForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
  });

  async onSubmit() {}
}
