import { Injectable } from '@angular/core';
import { Customer } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class Customer2Service {
  url = 'http://localhost:3000/customers';
  constructor() {}

  async getAllCustomers(): Promise<Customer[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((customer: any) => this.parseCustomer(customer)) ?? [];
  }

  async getCustomer(id: number): Promise<Customer> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json()) ?? null;
    return this.parseCustomer(data) ?? null;
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(`${this.url}/${customer.customer_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        address: customer.address,
        created_at: customer.created_at,
        updated_at: new Date().toISOString(), // Set `updated_at` to the current date-time
      }),
    });

    if (!response.ok) {
      alert(
        `Failed to update customer with ID ${customer.customer_id}: ${response.statusText}`
      );
    } else {
      alert(`Customer with ID ${customer.customer_id} updated successfully!`);
    }

    return (await response.json()) ?? null;
  }

  async deleteCustomer(id: number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }

  parseCustomer(customer: any): Customer {
    return {
      customer_id: customer.id ?? 0,
      name: customer.name ?? ' - ',
      email: customer.email ?? ' - ',
      phone_number: customer.phone_number ?? ' - ',
      address: customer.address ?? ' - ',
      created_at: new Date(customer.created_at),
      updated_at: new Date(customer.updated_at),
    };
  }
}
