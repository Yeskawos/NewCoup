import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApisPageComponent } from './pages/admin/apis-page/apis-page.component';
import { HomeComponent } from './pages/allPages/home/home/home.component';
import { LikesComponent } from './pages/allPages/likes/likes/likes.component';
import { MensajeriaComponent } from './pages/allPages/mensajeria/mensajeria/mensajeria.component';
import { ProfileComponent } from './pages/allPages/profile/profile/profile.component';
import { PublicacionesComponent } from './pages/allPages/publicaciones/publicaciones/publicaciones.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './components/cards/card/card.component';
import { ChatComponent } from './pages/allPages/chat/chat.component';
import { EnviarmensajeComponent } from './components/enviarmensaje/enviarmensaje.component';
import { ProfileVisitedComponent } from './pages/allPages/profileVisited/profile-visited/profile-visited.component';


@NgModule({
  declarations: [
    ApisPageComponent,
    HomeComponent,
    LikesComponent,
    MensajeriaComponent,
    ProfileComponent,
    PublicacionesComponent,
    NavbarComponent,
    CardComponent,
    ChatComponent,
    EnviarmensajeComponent,
    ProfileVisitedComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSidenavModule, 
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class AplicationModule { }
