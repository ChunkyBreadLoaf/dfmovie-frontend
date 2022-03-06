import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export class AppRouteGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { currentUser } = this.authService;
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (!route.data || !route.data['permission']) {
      return true;
    }

    const { permissions } = currentUser;
    const isAuthorized = permissions.includes(route.data['permission']);

    if (isAuthorized) {
      return true;
    }

    this.router.navigate([this.selectBestRoute()]);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    const { currentUser } = this.authService;

    if (!currentUser) {
      return '/account/login';
    }

    const { permissions } = currentUser;

    if (permissions.includes('Pages.Users.Create')) {
      return '/admin/users';
    }

    return '/';
  }
}
