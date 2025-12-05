import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promo',
})
export class PromoPipe implements PipeTransform {

  transform(price: number, percentual: number): number {
    let perc = Math.min(Math.max(percentual, 0), 100);
    let desc = price * (1 - perc / 100);
    return Math.round(desc * 100) / 100;
  }

}
