import { CreateUserDto, UpdateUserDto, User } from '../models/users.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ProxyServiceBase } from '../models/proxyBase.interface';
import { ResponseResult } from '../models/auth.model';
import { API_BASE_URL } from '../shared.tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService implements ProxyServiceBase {
  private readonly userRemoteService = `${this.baseURL}/users`;
  private readonly user: BehaviorSubject<User>;
  private readonly users: BehaviorSubject<User[]>;
  readonly usersStore$: Observable<User[]>;
  readonly userStore$: Observable<User>;

  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly http: HttpClient
  ) {
    this.users = new BehaviorSubject<User[]>([]);
    this.user = new BehaviorSubject<User>({} as any);
    this.usersStore$ = this.users.asObservable();
    this.userStore$ = this.user.asObservable();
  }

  findAll(): void {
    this.http
      .get<ResponseResult<User[]>>(this.userRemoteService)
      .subscribe(({ data }) => {
        this.users.next(data);
      });
  }

  findById(id: string): void {
    this.http
      .get<ResponseResult<User>>(`${this.userRemoteService}/${id}`)
      .subscribe(({ data }) => {
        this.user.next(data);
      });
  }

  create(createUserDto: CreateUserDto): void {
    this.http
      .post<ResponseResult<User>>(this.userRemoteService, createUserDto)
      .subscribe(({ data }) => {
        const { value } = this.users;
        value.push(data);

        this.users.next(value);
      });
  }

  update(id: string, updateUserDto: UpdateUserDto): void {
    this.http
      .put<ResponseResult<User>>(
        `${this.userRemoteService}/${id}`,
        updateUserDto
      )
      .subscribe(({data}) => {
        const { value } = this.users;
        const updatedUsers = value.find((user) => user._id === id)!;

        Object.assign(updatedUsers, data);

        this.users.next(value);
      });
  }

  delete(id: string): void {
    this.http
      .delete<ResponseResult<boolean>>(`${this.userRemoteService}/${id}`)
      .subscribe(({ data }) => {
        if (data) {
          const { value } = this.users;
          const updatedUsers = value.filter((user) => user._id !== id);

          this.users.next(updatedUsers);
        }
      });
  }

  resetStores(): void {
    this.users.next([]);
    this.user.next({} as any);
  }
}
