import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CartItem } from '../produtos/cart-item/cart-item';
import { CartService } from '../../services/cart/cart-service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/order/order-service';
import { Auth } from '../../services/auth';
import { AddressService } from '../../services/address/address-service';

@Component({
  selector: 'app-cart',
  imports: [CartItem, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private authService = inject(Auth);
  private addressService = inject(AddressService);

  cart = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading.set(true);
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  checkout() {
    if(!confirm('Deseja finalizar a compra?')) return;

    const userId = this.authService.getUserIdFromStorage();
    if (!userId) {
        alert('Faça login para continuar.');
        this.router.navigate(['/register']);
        return;
    }

    this.loading.set(true);

    this.addressService.findByUserId(userId).subscribe({
        next: (address) => {
            console.log('Endereço recebido:', address);
            if (this.isAddressComplete(address)) {
                this.finalizeOrder();
            } else {
                alert('Seu cadastro de endereço está incompleto. Por favor, preencha para continuar.');
                this.loading.set(false);
                this.router.navigate(['/profile/address']);
            }
        },
        error: (err) => {
            console.warn('Erro ao buscar endereço:', err);
            alert('Endereço não encontrado.');
            this.loading.set(false);
            this.router.navigate(['/profile/address']);
        }
    });
  }

  private finalizeOrder() {
    this.orderService.checkout().subscribe({
      next: (order) => {
        alert('Compra realizada com sucesso!');
        this.router.navigate(['/profile/orders']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Erro ao finalizar compra.');
        this.loading.set(false);
      }
    });
  }

  private isAddressComplete(addr: any): boolean {
    if (!addr) return false;
    if (!addr.street || addr.street.trim() === '') return false;
    if (!addr.cep || addr.cep.trim() === '') return false;
    if (!addr.city || addr.city.trim() === '') return false;
    if (!addr.houseNumber || addr.houseNumber.trim() === '') return false;
    return true;
  }
}
