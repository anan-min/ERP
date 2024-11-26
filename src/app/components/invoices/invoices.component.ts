import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../modules/data';
import { InvoiceService } from '../../services/invoice/invoice.service';
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
            <th>status</th>
            <th>discount</th>
            <th>notes</th>
            <th>due date</th>
            <th>created at</th>
            <th>updated at</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let invoice of invoices">
            <td>{{ invoice.invoice_id }}</td>
            <td>
              <a [routerLink]="['/customers', invoice.customer_id]">
                {{ invoice.customer_id }}
              </a>
            </td>
            <td>
              <a [routerLink]="['/orders', invoice.order_id]">
                {{ invoice.order_id }}
              </a>
            </td>
            <td>{{ invoice.total_amount }}</td>
            <td>{{ invoice.status }}</td>
            <td>{{ invoice.discount }}</td>
            <td>{{ invoice.notes ?? 'no notes' }}</td>
            <td>{{ invoice.due_date }}</td>
            <td>{{ invoice.created_at }}</td>
            <td>{{ invoice.updated_at }}</td>
            <td>
              <a [routerLink]="['/invoices', invoice.invoice_id]">
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
  invoiceService = inject(InvoiceService);
  invoices: Invoice[] = [];

  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.loadInvoices();
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

  navigateToInvoiceDetail(invoice_id: number) {}
}
