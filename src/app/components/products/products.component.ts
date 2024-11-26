import { Component, inject } from '@angular/core';
import { Product } from '../../modules/data';
import { ProductService } from '../../services/product/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products">
            <td>
              <a [routerLink]="['/customers', product.product_id]">
                {{ product.product_id }}
              </a>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.created_at }}</td>
            <td>{{ product.updated_at }}</td>
            <td>
              <a [routerLink]="['/products', product.product_id]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deleteProduct(product.product_id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  productIDs: Number[] = [];

  async ngOnInit(): Promise<void> {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService
      .getAllProducts()
      .then((products) => {
        this.products = products;
      })
      .catch((error: Error) => {
        console.error('Error fetching products:', error);
        alert('Failed to load products');
      });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).then(() => {
      this.loadProducts();
    });
  }
}
