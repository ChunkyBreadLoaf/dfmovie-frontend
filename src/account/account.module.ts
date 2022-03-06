import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AccountComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
