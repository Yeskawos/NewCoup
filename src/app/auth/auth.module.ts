import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GustosComponent } from './pages/register/gustos/gustos.component';
import { DatosComponent } from './pages/register/datos/datos.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    GustosComponent,
    DatosComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
