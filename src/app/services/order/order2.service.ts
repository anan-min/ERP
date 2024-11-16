import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../../modules/data';

@Injectable({
  providedIn: 'root',
})
export class Order2Service {
  url = 'http://localhost:3000/orders';
  constructor() {}

  async getAllOrders(): Promise<Order[]> {
    const response = await fetch(this.url);
    const data = (await response.json()) ?? [];
    return data.map((order: any) => this.parseOrder(order)) ?? [];
  }

  async getOrder(id: number): Promise<Order> {
    const response = await fetch(`${this.url}/${id}`);
    const data = (await response.json()) ?? null;
    return this.parseOrder(data) ?? null;
  }

  private parseOrder(order: any): Order {
    return {
      order_id: order.order_id,
      customer_id: order.customer_id,
      order_date: new Date(order.order_date),
      total_amount: order.total_amount,
      status: this.mapStatus(order.status),
      created_at: new Date(order.created_at),
      updated_at: new Date(order.updated_at),
    };
  }

  private mapStatus(status: string): OrderStatus {
    switch (status) {
      case 'PENDING':
        return OrderStatus.PENDING;
      case 'COMPLETED':
        return OrderStatus.COMPLETED;
      case 'CANCELLED':
        return OrderStatus.CANCELLED;
      case 'IN_PROGRESS':
        return OrderStatus.IN_PROGRESS;
      default:
        return OrderStatus.PENDING;
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
    const data = (await response.json()) ?? null;
    return this.parseOrder(data) ?? null;
  }
}