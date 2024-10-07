import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../services/auth.guard'; // Asegúrate de que el AuthGuard esté implementado

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard] // Protege esta página para usuarios autenticados
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
