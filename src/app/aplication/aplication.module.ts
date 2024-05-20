import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApisPageComponent } from './pages/admin/apis-page/apis-page.component';
import { ReportsPageComponent } from './pages/admin/reports/reports-page/reports-page.component';
import { BuscadorComponent } from './pages/allPages/buscador/buscador/buscador.component';
import { HomeComponent } from './pages/allPages/home/home/home.component';
import { LikesComponent } from './pages/allPages/likes/likes/likes.component';
import { MensajeriaComponent } from './pages/allPages/mensajeria/mensajeria/mensajeria.component';
import { PlanEstaNocheComponent } from './pages/allPages/planEstaNoche/plan-esta-noche/plan-esta-noche.component';
import { ProfileComponent } from './pages/allPages/profile/profile/profile.component';
import { PublicacionesComponent } from './pages/allPages/publicaciones/publicaciones/publicaciones.component';
import { ManageUsersPageComponent } from './pages/admin/manageUsersPage/manage-users-page/manage-users-page.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './components/cards/card/card.component';


@NgModule({
  declarations: [
    ApisPageComponent,
    ManageUsersPageComponent,
    ReportsPageComponent,
    BuscadorComponent,
    HomeComponent,
    LikesComponent,
    MensajeriaComponent,
    PlanEstaNocheComponent,
    ProfileComponent,
    PublicacionesComponent,
    NavbarComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AplicationModule { }
