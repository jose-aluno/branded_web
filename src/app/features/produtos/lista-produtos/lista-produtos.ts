import { Component } from '@angular/core';
import { HeroSection } from "../../../shared/hero-section/hero-section";
import { CardProduto } from "../card-produto/card-produto";
import { Footer } from "../../../core/footer/footer";

@Component({
  selector: 'app-lista-produtos',
  imports: [HeroSection, CardProduto, Footer],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

}
