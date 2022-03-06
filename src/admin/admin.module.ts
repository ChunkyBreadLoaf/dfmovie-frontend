import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [UsersComponent, AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
