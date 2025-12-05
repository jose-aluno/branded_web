import { Component } from '@angular/core';
import { OrderItem } from "../../../produtos/order-item/order-item";

@Component({
  selector: 'app-orders',
  imports: [OrderItem],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

}
