import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../modules/data';
import { Invoice2Service } from '../../services/invoice/invoice2.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Invoices List</h2>
      <table>
        <thead>
          <tr>
            <th>invoice Id</th>
            <th>customer id</th>
            <th>order id</th>
            <th>total amount</th>
            <th>created at</th>
            <th>updated at</th>
            <th>status</th>
            <th>due date</th>
            <th>discount</th>
            <th>notes</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let invoice of invoices">
            <td>{{ invoice.invoice_id }}</td>
            <td>
              <a [routerLink]="['/customer-detail', invoice.customer_id]">
                {{ invoice.customer_id }}
              </a>
            </td>
            <td>
              <a [routerLink]="['/order-detail', invoice.order_id]">
                {{ invoice.order_id }}
              </a>
            </td>
            <td>{{ invoice.total_amount }}</td>
            <td>{{ invoice.created_at }}</td>
            <td>{{ invoice.updated_at }}</td>
            <td>{{ invoice.status }}</td>
            <td>{{ invoice.due_date }}</td>
            <td>{{ invoice.discount }}</td>
            <td>{{ invoice.notes }}</td>
            <td>
              <a [routerLink]="['/invoice-detail', invoice]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deleteStudent(invoice.invoice_id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './invoices.component.css',
})
export class InvoicesComponent {
  invoiceService = inject(Invoice2Service);
  invoices: Invoice[] = [];

  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.loadInvoices();
    this.invoices.map((invoice) => {
      console.log(invoice);
    });
  }

  async loadInvoices() {
    await this.invoiceService.getAllInvoices().then((invoices) => {
      this.invoices = invoices;
    });
  }

  async deleteStudent(invoice_id: number) {
    await this.invoiceService.deleteInvoice(invoice_id).then(() => {
      this.loadInvoices();
    });
  }
}
