import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginRouteGuard } from './auth/login-route.guard';
import { AppRouteGuard } from './auth/auth-route.guard';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AppRouteGuard, LoginRouteGuard],
    };
  }
}
