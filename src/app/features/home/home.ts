import { Component } from '@angular/core';
import { HeroSection } from '../../shared/hero-section/hero-section';
import { Footer } from '../../core/footer/footer';
import { HighlightCard } from "../produtos/highlight-card/highlight-card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [HeroSection, Footer, HighlightCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
