import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'products', component: ListaProdutos},
    {path: '**', redirectTo: ''}
];
