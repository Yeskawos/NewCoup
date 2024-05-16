import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApisPageComponent } from './pages/adminApisPage/apis-page/apis-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApisPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class AplicationModule { }
