import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginRouteGuard } from './auth/login-route.guard';
import { AppRouteGuard } from './auth/auth-route.guard';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { DfInputComponent } from './components/df-input/df-input.component';
import { HeaderSearchBarComponent } from './components/header-search-bar/header-search-bar.component';
import { AccountDropdownComponent } from './components/header/account-dropdown/account-dropdown.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DfInputComponent, HeaderSearchBarComponent, AccountDropdownComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, DfInputComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AppRouteGuard, LoginRouteGuard],
    };
  }
}
