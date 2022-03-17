import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly ngDestroy$: Subject<void>;

  isInvalid: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.ngDestroy$ = new Subject();
    this.isInvalid = false;
  }

  ngOnInit(): void {
    const returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.authService.currentUser) {
      this.router.navigate([returnURL]);

      return;
    }

    this.authService.operationCompletionNotifer$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(({ statusCode }) => {
        if (statusCode === 406) {
          this.isInvalid = true;

          return;
        }

        this.router.navigate([returnURL]);
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }
}
