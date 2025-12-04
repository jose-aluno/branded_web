import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { Register } from './features/account/register/register';
import { Profile } from './features/account/profile/profile';
import { Data } from './features/account/profile/data/data';
import { Address } from './features/account/profile/address/address';
import { Orders } from './features/account/profile/orders/orders';
import { CreateProduct } from './features/produtos/create-product/create-product';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'products', component: ListaProdutos},
    {path: 'register', component: Register},
    {path: 'profile', component: Profile, children: [
      { path: '', redirectTo: 'data', pathMatch: 'full' },
      { path: 'data', component: Data },
      { path: 'address', component: Address },
      { path: 'orders', component: Orders },
      { path: 'createProduct', component: CreateProduct },
    ]},
    {path: '**', redirectTo: ''}
];
