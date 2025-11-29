import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/navbar/navbar";
import { HeroSection } from './shared/hero-section/hero-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HeroSection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('branded_web');
}
