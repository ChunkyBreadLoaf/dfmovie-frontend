import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: [''],
      password: [''],
    });
    this.ngDestroy$ = new Subject();
  }

  onFormSubmit(value: any) {
    this.authService.login(value);
  }

  ngOnInit(): void {
    const returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authService.operationCompletionNotifer$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.router.navigate([returnURL]);
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }
}
