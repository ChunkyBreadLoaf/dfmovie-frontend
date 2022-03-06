import { ModuleWithProviders, NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService],
    };
  }
}
