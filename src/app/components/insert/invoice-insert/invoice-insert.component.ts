import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceStatus } from '../../../modules/data';

import { CustomerService } from '../../../services/customer/customer.service';
import { OrderService } from '../../../services/order/order.service';
import { InvoiceService } from '../../../services/invoice/invoice.service';

@Component({
  selector: 'app-invoice-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-insert.component.html',
  styleUrl: './invoice-insert.component.css',
})
export class InvoiceInsertComponent {
  customerService = inject(CustomerService);
  orderService = inject(OrderService);
  invoiceService = inject(InvoiceService);

  insertForm = new FormGroup({
    customer_id: new FormControl(0),
    order_id: new FormControl(0),
    total_amount: new FormControl(0),
    status: new FormControl(InvoiceStatus.PENDING),
    due_date: new FormControl(),
    discount: new FormControl(0),
    notes: new FormControl(''),
  });

  validCustomersIDs: Number[] = [];
  validOrdersIDs: Number[] = [];

  constructor() {}

  async ngOnInit() {
    // set customer id and order id to first available id
    this.validCustomersIDs = await this.customerService.getAllCustomerIds();
    this.validOrdersIDs = await this.orderService.getAllOrderIds();

    // how to patch just two value from all form

    // this.insertForm.patchValue({
    //   customer_id: this.validCustomersIDs[0] ?? 1,
    //   order_id: this.validOrdersIDs[0] ?? 1,
    // })
  }

  async onSubmit() {
    if(this.insertForm.valid) {
      
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Return date in yyyy-mm-dd format
  }
}
