import { RootRoutingModule } from './root-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root.component';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { API_BASE_URL } from './shared/shared.tokens';
import { environment } from './environments/environment';
import { ErrorComponent } from './error/error.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt-auth.interceptor';

@NgModule({
  declarations: [RootComponent, ErrorComponent],
  imports: [BrowserModule, RootRoutingModule, SharedModule.forRoot()],
  providers: [
    {
      provide: API_BASE_URL,
      useFactory: () => environment.remoteServiceBaseUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
