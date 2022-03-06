import { JWT, LoginInfoDto, ResponseResult, User } from '../models/auth.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../shared.tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authRemoteUrl = `${this.baseURL}/auth`
  private readonly currentUserSubject: BehaviorSubject<User | null>;
  private readonly operationCompletionNotifer: Subject<string>;

  readonly currentUser$: Observable<User | null>;
  readonly operationCompletionNotifer$: Observable<string>;

  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.operationCompletionNotifer = new Subject<string>();
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.operationCompletionNotifer$ = this.operationCompletionNotifer.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginInfo: LoginInfoDto): void {
    this.http
      .post<ResponseResult<JWT>>(`${this.authRemoteUrl}/login`, loginInfo)
      .pipe(tap(() => this.notifyComplete('login')))
      .subscribe(({ data }) => {
        const { access_token } = data;
        const { sub, username, permissions } = parseJwt(access_token);
        const stringifiedUser = JSON.stringify({ token: access_token, _id: sub, username, permissions });

        localStorage.setItem('currentUser', stringifiedUser);
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private notifyComplete(operation: string) {
    this.operationCompletionNotifer.next(operation);
  }
}

function parseJwt (token: string): Record<string, any> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  return JSON.parse(jsonPayload);
};
