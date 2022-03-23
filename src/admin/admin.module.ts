import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { MoviesComponent } from './movies/movies.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [UsersComponent, AdminComponent, MoviesComponent, CategoriesComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, TableModule],
})
export class AdminModule {}
