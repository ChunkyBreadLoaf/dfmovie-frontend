import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../shared.tokens';
import { HttpClient } from '@angular/common/http';
import { JWT, LoginInfoDto, ResponseResult, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authRemoteUrl = `${this.baseURL}/auth`
  private readonly currentUserSubject: BehaviorSubject<User | null>;

  readonly currentUser$: Observable<User | null>;

  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginInfo: LoginInfoDto): void {
    this.http.post<ResponseResult<JWT>>(`${this.authRemoteUrl}/login`, loginInfo).subscribe(({ data }) => {
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
}

function parseJwt (token: string): Record<string, any> {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
