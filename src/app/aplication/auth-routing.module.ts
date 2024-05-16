import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApisPageComponent } from './pages/adminApisPage/apis-page/apis-page.component';

const routes: Routes = [
  {
    path: 'apis',
    component: ApisPageComponent,
  },
  {
    path: '**',
    redirectTo: 'apis'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
