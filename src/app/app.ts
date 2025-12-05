import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/navbar/navbar";
import { HeroSection } from './shared/hero-section/hero-section';
import { Footer } from './core/footer/footer';
import { CardProduto } from './features/produtos/card-produto/card-produto';
import { HighlightCard } from "./features/produtos/highlight-card/highlight-card";
import { CartItem } from "./features/produtos/cart-item/cart-item";
import { Cart } from './features/cart/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('branded_web');

  showCart = signal(false);

  toggleCart() {
    this.showCart.update(currentValue => !currentValue);
  }
}
