import { LandingPageComponent } from './landing-page/landing-page.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomepageComponent,
    MovieInfoComponent,
    SearchComponent,
  ],
  imports: [AppRoutingModule, SharedModule],
  providers: [],
})
export class AppModule {}
