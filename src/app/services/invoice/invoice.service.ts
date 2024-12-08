import { Injectable } from '@angular/core';
import { Invoice, InvoiceStatus } from '../../modules/data';
import { create } from 'domain';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  url = 'http://localhost:3000/invoices';

  constructor() {}

  async getAllInvoices(): Promise<Invoice[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((invoice: any) => this.parseInvoice(invoice)) ?? [];
  }

  async getAllInvoiceIds(): Promise<number[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((invoice: any) => invoice.invoice_id) ?? [];
  }

  async getInvoice(id: number): Promise<Invoice> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json()) ?? null;
    return this.parseInvoice(data) ?? null;
  }

  async editInvoice(invoice: Invoice): Promise<Invoice> {
    const response = await fetch(`${this.url}/${invoice.invoice_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: invoice.customer_id,
        order_id: invoice.order_id,
        total_amount: invoice.total_amount,
        status: invoice.status,
        due_date: invoice.due_date,
        discount: invoice.discount,
        notes: invoice.notes,
      }),
    });
    return (await response.json()) ?? null;
  }

  async insertInvoice(invoice: Invoice): Promise<Invoice> {
    console.log(invoice);
    const response = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: invoice.customer_id,
        order_id: invoice.order_id,
        create_at: invoice.created_at,
        total_amount: invoice.total_amount,
        status: invoice.status,
        due_date: invoice.due_date,
        discount: invoice.discount,
        notes: invoice.notes,
      }),
    });
    return (await response.json()) ?? null;
  }

  async deleteInvoice(id: number): Promise<Invoice> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    return (await response.json()) ?? null;
  }

  async addInvoice(invoice: Invoice): Promise<Invoice> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    return (await response.json()) ?? null;
  }

  async generateNewInvoiceId(): Promise<number> {
    const invoices = await this.getAllInvoices();
    let newId = Math.max(...invoices.map((invoice) => invoice.invoice_id)) + 1;
    while (invoices.some((invoice) => invoice.invoice_id === newId)) {
      newId++;
    }
    return newId;
  }

  private parseInvoice(invoice: any): Invoice {
    return {
      invoice_id: invoice.invoice_id ?? 0,
      customer_id: invoice.customer_id,
      order_id: invoice.order_id,
      total_amount: invoice.total_amount,
      created_at: new Date(invoice.created_at),
      updated_at: new Date(invoice.updated_at),
      status: this.mapStatus(invoice.status),
      due_date: new Date(invoice.due_date),
      discount: invoice.discount ?? 0,
      notes: invoice.notes ?? '',
    };
  }

  private mapStatus(status: string): InvoiceStatus {
    switch (status) {
      case 'overdue':
        return InvoiceStatus.OVERDUE;
      case 'paid':
        return InvoiceStatus.PAID;
      case 'pending':
        return InvoiceStatus.PENDING;
      case 'cancelled':
        return InvoiceStatus.CANCELLED;
      default:
        return InvoiceStatus.OVERDUE;
    }
  }
}
