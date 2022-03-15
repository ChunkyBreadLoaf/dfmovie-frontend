import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { currentUser } = this.authService;
    const returnURL = route.queryParams['returnUrl'] || '/';

    if (currentUser) {
      this.router.navigate([returnURL]);

      return false;
    }

    return true;
  }
}
