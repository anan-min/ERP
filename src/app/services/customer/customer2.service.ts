import { Injectable } from '@angular/core';
import { Customer } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class Customer2Service {
  url = 'https://jsonplaceholder.typicode.com/users';
  constructor() {}

  async getAllCustomers(): Promise<Customer[]> {
    const response = await fetch(this.url);
    return (await response.json()) ?? [];
  }

  async getCustomer(id: number): Promise<Customer> {
    const response = await fetch(`${this.url}/${id}`);
    return (await response.json()) ?? null;
  }

  async addCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    return (await response.json()) ?? null;
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(`${this.url}/${customer.customer_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    return (await response.json()) ?? null;
  }

  async deleteCustomer(id: number): Promise<Customer> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    return (await response.json()) ?? null;
  }

  parseCustomer (customer: any): Customer {
    return {
      customer_id: customer.id,
      name: customer.name,
      email: customer.email,
      phone_number: customer.phone,
      address: customer.address.street,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }
}
