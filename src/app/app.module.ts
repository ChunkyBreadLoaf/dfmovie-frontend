import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, SharedModule],
  providers: [],
})
export class AppModule {}
