import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorFilterInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((res) => {
        const { error } = res;
        const { statusCode, message } = error;

        if (statusCode === 401 || statusCode === 403 || statusCode === 500) {
          this.router.navigate(['/error'], {
            queryParams: { statusCode, message },
          });
        }

        return throwError(() => new Error(JSON.stringify(error)));
      })
    );
  }
}
