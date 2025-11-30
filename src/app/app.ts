import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/navbar/navbar";
import { HeroSection } from './shared/hero-section/hero-section';
import { Footer } from './core/footer/footer';
import { CardProduto } from './features/produtos/card-produto/card-produto';
import { HighlightCard } from "./features/produtos/highlight-card/highlight-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection, Footer, CardProduto, HighlightCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('branded_web');
}
