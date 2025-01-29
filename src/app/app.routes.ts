import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ContratoPage } from './pages/contrato/contrato.page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'contrato/:id', component: ContratoPage },
];
