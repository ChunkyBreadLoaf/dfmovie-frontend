import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../models/categories.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ProxyServiceBase } from '../models/proxyBase.interface';
import { ResponseResult } from '../models/auth.model';
import { API_BASE_URL } from '@tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoriesService implements ProxyServiceBase {
  private readonly categoryRemoteService = `${this.baseURL}/categories`;
  private readonly categories: BehaviorSubject<CategoryDto[]>;
  private readonly category: Subject<CategoryDto>;

  readonly categoriesStore$: Observable<CategoryDto[]>;
  readonly categoryStore$: Observable<CategoryDto>;

  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly http: HttpClient
  ) {
    this.categories = new BehaviorSubject<CategoryDto[]>([]);
    this.category = new Subject<CategoryDto>();
    this.categoriesStore$ = this.categories.asObservable();
    this.categoryStore$ = this.category.asObservable();
  }

  findAll(): void {
    this.http
      .get<ResponseResult<CategoryDto[]>>(this.categoryRemoteService)
      .subscribe(({ data }) => {
        this.categories.next(data);
      });
  }

  findById(id: string): void {
    this.http
      .get<ResponseResult<CategoryDto>>(`${this.categoryRemoteService}/${id}`)
      .subscribe(({ data }) => {
        this.category.next(data);
      });
  }

  create(createDto: CreateCategoryDto): void {
    this.http
      .post<ResponseResult<CategoryDto>>(this.categoryRemoteService, createDto)
      .subscribe(({ data }) => {
        const { value } = this.categories;

        value.push(data);

        this.categories.next(value);
      });
  }

  update(id: string, updateDto: UpdateCategoryDto): void {
    this.http
      .put<ResponseResult<CategoryDto>>(
        `${this.categoryRemoteService}/${id}`,
        updateDto
      )
      .subscribe(({ data }) => {
        const { value } = this.categories;
        const updatedMovie = value.find(({ _id }) => data._id === _id);

        Object.assign(updateDto, value);

        this.categories.next(value);
      });
  }

  delete(id: string): void {
    this.http
      .delete<ResponseResult<boolean>>(`${this.categoryRemoteService}/${id}`)
      .subscribe(({ data }) => {
        if (data) {
          const { value } = this.categories;
          const updatedMovies = value.filter(({ _id }) => id === _id);

          this.categories.next(updatedMovies);
        }
      });
  }

  resetStores(): void {
    this.categories.next([]);
  }
}
