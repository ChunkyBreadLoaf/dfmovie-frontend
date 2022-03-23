import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AppRouteGuard } from 'src/shared/auth/auth-route.guard';
import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin/users' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: { permission: 'Pages.Users' },
        canActivate: [AppRouteGuard],
      },
      {
        path: 'movies',
        component: MoviesComponent,
        data: { permission: 'Pages.Movies' },
        canActivate: [AppRouteGuard]
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        data: { permission: 'Pages.Categories' },
        canActivate: [AppRouteGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
