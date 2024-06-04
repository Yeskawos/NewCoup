import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApisPageComponent } from './pages/admin/apis-page/apis-page.component';
import { ManageUsersPageComponent } from './pages/admin/manageUsersPage/manage-users-page/manage-users-page.component';
import { ReportsPageComponent } from './pages/admin/reports/reports-page/reports-page.component';
import { HomeComponent } from './pages/allPages/home/home/home.component';
import { LikesComponent } from './pages/allPages/likes/likes/likes.component';
import { MensajeriaComponent } from './pages/allPages/mensajeria/mensajeria/mensajeria.component';
import { PlanEstaNocheComponent } from './pages/allPages/planEstaNoche/plan-esta-noche/plan-esta-noche.component';
import { ProfileComponent } from './pages/allPages/profile/profile/profile.component';
import { PublicacionesComponent } from './pages/allPages/publicaciones/publicaciones/publicaciones.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { ChatComponent } from './pages/allPages/chat/chat.component';


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
        path: 'manageUsers',
        component: ManageUsersPageComponent
      },
      {
        path: 'reports',
        component: ReportsPageComponent
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
        path: 'planEstaNoche',
        component: PlanEstaNocheComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
