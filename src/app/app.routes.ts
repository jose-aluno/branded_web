import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { Register } from './features/account/register/register';
import { Profile } from './features/account/profile/profile';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'products', component: ListaProdutos},
    {path: 'register', component: Register},
    {path: 'profile', component: Profile},
    {path: '**', redirectTo: ''}
];
