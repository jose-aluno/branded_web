import { Component, inject, signal } from '@angular/core';
import { OrderItem } from "../../../produtos/order-item/order-item";
import { OrderService } from '../../../../services/order/order-service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderItem, DatePipe, CurrencyPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  private orderService = inject(OrderService);
  
  orders = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.orders.set(sorted);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
