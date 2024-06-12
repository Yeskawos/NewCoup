import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApisPageComponent } from './pages/admin/apis-page/apis-page.component';
import { HomeComponent } from './pages/allPages/home/home/home.component';
import { LikesComponent } from './pages/allPages/likes/likes/likes.component';
import { MensajeriaComponent } from './pages/allPages/mensajeria/mensajeria/mensajeria.component';
import { ProfileComponent } from './pages/allPages/profile/profile/profile.component';
import { PublicacionesComponent } from './pages/allPages/publicaciones/publicaciones/publicaciones.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ChatComponent } from './pages/allPages/chat/chat.component';
import { ProfileVisitedComponent } from './pages/allPages/profileVisited/profile-visited/profile-visited.component';
import { Error404Component } from '../shared/errorPage/error404/error404.component';


const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'apis',
        component: ApisPageComponent,
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'likes',
        component: LikesComponent
      },
      {
        path: 'mensajeria',
        component: MensajeriaComponent
      },
      {
        path: 'mensajeria/:id',
        component: ChatComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/:id',
        component: ProfileVisitedComponent
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent
      }
    ]
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }