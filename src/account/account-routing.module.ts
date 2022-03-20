import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginRouteGuard } from '@shared/auth/login-route.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/account/login' },
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginRouteGuard] },
      { path: 'register', component: LoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
