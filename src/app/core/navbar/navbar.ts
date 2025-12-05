import { Component, output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public cartClicked = output<void>();

  openCart() {
    this.cartClicked.emit();
  }
}
