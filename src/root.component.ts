import { Component } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent {
  constructor(private readonly authService: AuthService) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.authService.currentUser = JSON.parse(currentUser);
    }
  }
}
