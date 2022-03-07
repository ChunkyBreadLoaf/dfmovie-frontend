import { ModuleWithProviders, NgModule } from '@angular/core';
import { CategoriesService } from './categories.service';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies.service';
import { CommonModule } from '@angular/common';
import { RolesService } from './roles.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class ServiceProxiesModule {
  static forRoot(): ModuleWithProviders<ServiceProxiesModule> {
    return {
      ngModule: ServiceProxiesModule,
      providers: [MoviesService, CategoriesService, RolesService, UsersService],
    };
  }
}
