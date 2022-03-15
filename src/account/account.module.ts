import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AccountComponent } from './account.component';
import { SignupComponent } from './signup/signup.component';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login/login.component';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
  ],
})
export class AccountModule {}
