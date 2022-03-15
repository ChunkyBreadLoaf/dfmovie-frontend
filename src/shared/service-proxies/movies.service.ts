import { CreateMovieDto, MovieDto, UpdateMovieDto, } from '../models/movies.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ProxyServiceBase } from '../models/proxyBase.interface';
import { ResponseResult } from '../models/auth.model';
import { API_BASE_URL } from '@tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MoviesService implements ProxyServiceBase {
  private readonly movieRemoteService = `${this.baseURL}/movies`;
  private readonly movies: BehaviorSubject<MovieDto[]>;
  private readonly movie: Subject<MovieDto>;

  readonly moviesStore$: Observable<MovieDto[]>;
  readonly movieStore$: Observable<MovieDto>;

  constructor(
    @Inject(API_BASE_URL) private readonly baseURL: string,
    private readonly http: HttpClient
  ) {
    this.movies = new BehaviorSubject<MovieDto[]>([]);
    this.movie = new Subject<MovieDto>();
    this.moviesStore$ = this.movies.asObservable();
    this.movieStore$ = this.movie.asObservable();
  }

  findAll(): void {
    this.http
      .get<ResponseResult<MovieDto[]>>(this.movieRemoteService)
      .subscribe(({ data }) => {
        this.movies.next(data);
      });
  }

  findById(id: string): void {
    this.http
      .get<ResponseResult<MovieDto>>(`${this.movieRemoteService}/${id}`)
      .subscribe(({ data }) => {
        this.movie.next(data);
      });
  }

  create(createDto: CreateMovieDto): void {
    this.http
      .post<ResponseResult<MovieDto>>(this.movieRemoteService, createDto)
      .subscribe(({ data }) => {
        const { value } = this.movies;

        value.push(data);

        this.movies.next(value);
      });
  }

  update(id: string, updateDto: UpdateMovieDto): void {
    this.http
      .put<ResponseResult<MovieDto>>(
        `${this.movieRemoteService}/${id}`,
        updateDto
      )
      .subscribe(({ data }) => {
        const { value } = this.movies;
        const updatedMovie = value.find(({ _id }) => data._id === _id);

        Object.assign(updateDto, value);

        this.movies.next(value);
      });
  }

  delete(id: string): void {
    this.http
      .delete<ResponseResult<boolean>>(`${this.movieRemoteService}/${id}`)
      .subscribe(({ data }) => {
        if (data) {
          const { value } = this.movies;
          const updatedMovies = value.filter(({ _id }) => id === _id);

          this.movies.next(updatedMovies);
        }
      });
  }

  resetStores(): void {
    this.movies.next([]);
  }
}
