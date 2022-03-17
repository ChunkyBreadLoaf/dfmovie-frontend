import { Component } from '@angular/core';
import { UsersService } from '@services/users.service';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.authService.currentUser = JSON.parse(currentUser);
      this.userService.findById(this.authService.currentUser?._id as string);
    }
  }
}
