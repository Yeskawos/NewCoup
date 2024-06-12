import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/errorPage/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { PortadaComponent } from './portada/portada/portada.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'newCoup',
    loadChildren: () => import('./aplication/aplication.module').then(m => m.AplicationModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: PortadaComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
