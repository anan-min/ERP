import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../modules/data';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  
  `,
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  productServices = inject(ProductService);
  ids: Number[]  = [];

  async ngOnInit() {
    this.ids = await this.productServices.getProductIds();
    console.log(this.ids);
  }

}
