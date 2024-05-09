import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DatosComponent } from './pages/register/datos/datos.component';
import { GustosComponent } from './pages/register/gustos/gustos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent,
        children: [
          {
            path: 'datos',
            component: DatosComponent
          },
          {
            path: 'gustos',
            component: GustosComponent
          },
          {
            path: '**',
            redirectTo: 'datos'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
