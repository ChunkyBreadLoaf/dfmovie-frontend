import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { API_BASE_URL } from '../shared.tokens';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const { currentUser } = this.authService;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(this.baseURL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
