import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../modules/data';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <h1>Edit Product Details</h1>

      <div class="form-group">
        <label for="product_id">Product ID:</label>
        <div>{{ product?.product_id }}</div>
      </div>

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          class="form-control"
          formControlName="name"
          placeholder="Enter product's name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          class="form-control"
          formControlName="description"
          placeholder="Enter product's description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="price">Price:</label>
        <input
          id="price"
          type="number"
          class="form-control"
          formControlName="price"
          placeholder="Enter product's price"
        />
      </div>

      <div class="form-group">
        <label for="updated_at">Updated At:</label>
        <div>{{ product?.updated_at }}</div>
      </div>

      <div class="form-group">
        <label for="created_at">Updated At:</label>
        <div>{{ product?.created_at }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  product: Product | undefined;
  productID = -1;

  editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
  });

  constructor() {
    this.productID = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.productID).then((product) => {
      this.product = product;
      this.editForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
      });
    });
  }

  async onSubmit() {
    if (this.editForm.valid) {
      await this.productService.updateProduct({
        product_id: this.productID,
        name: this.editForm.value.name ?? '',
        description: this.editForm.value.description ?? '',
        price: this.editForm.value.price ?? 0,
        created_at: this.product?.created_at ?? new Date(),
        updated_at: new Date(),
      });
    }

    this.router.navigate(['/products']);
  }
}
