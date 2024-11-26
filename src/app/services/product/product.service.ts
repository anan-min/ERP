import { Injectable } from '@angular/core';
import { Product } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/products';
  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((product: any) => this.parseProduct(product)) ?? [];
  }

  async getProductIds(): Promise<number[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((product: any) => product.product_id) ?? [];
  }

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json()) ?? null;
    return this.parseProduct(data) ?? null;
  }

  async updateProduct(product: Product): Promise<Product> {
    const response = await fetch(`${this.url}/${product.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
      }),
    });
    return (await response.json()) ?? null;
  }

  private parseProduct(product: any): Product {
    return {
      product_id: product.product_id ?? 0,
      name: product.name,
      description: product.description,
      price: product.price,
      created_at: new Date(product.created_at),
      updated_at: new Date(product.updated_at),
    };
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }
}
