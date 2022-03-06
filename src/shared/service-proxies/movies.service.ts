import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProxyServiceBase } from '../models/proxyBase.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService implements ProxyServiceBase {
  private readonly movies: BehaviorSubject<any>;

  readonly moviesStore$: Observable<any>;

  constructor() {
    this.movies = new BehaviorSubject<any>('');
    this.moviesStore$ = this.movies.asObservable();
  }

  findAll(): void {
    throw new Error('Method not implemented.');
  }

  findById(id: string): void {
    throw new Error('Method not implemented.');
  }

  create(createDto: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateDto: Record<string, any>): void {
    throw new Error('Method not implemented.');
  }

  delete(id: string): void {
    throw new Error('Method not implemented.');
  }

  resetStores(): void {
    throw new Error('Method not implemented.');
  }
}
