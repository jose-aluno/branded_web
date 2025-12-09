export interface Product {
  id?: string;
  name: string;
  description: string;
  artist: string;
  price: number;
  imageUrl: string;
  stock: number;   
  promo: Boolean;    
}