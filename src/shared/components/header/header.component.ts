import { CategoriesService, MoviesService } from '@services/proxies';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MovieDto } from '@shared/models/movies.model';
import { CategoryDto } from '@shared/models/categories.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  movies: MovieDto[];
  categories: CategoryDto[];

  constructor(
    private readonly moviesService: MoviesService,
    private readonly categoriesService: CategoriesService
  ) {
    super();

    this.movies = [];
    this.categories = [];
  }

  // =============================
  // LIFECYCLE METHODS
  // =============================
  ngOnInit(): void {
    this.initStores();
    this.fetchDataIfNotExist();
  }

  // =============================
  // DATA PROCESSOR METHODS
  // =============================
  private processMovieResponseData(data: MovieDto[]) {
    this.movies = data;
  }

  private processCategoriesResponseData(data: CategoryDto[]) {
    this.categories = data;
  }

  // =============================
  // UTIL METHODS
  // =============================
  private initStores(): void {
    this.registerStore(this.moviesService.moviesStore$, (data) =>
      this.processMovieResponseData(data)
    );

    this.registerStore(this.categoriesService.categoriesStore$, (data) =>
      this.processCategoriesResponseData(data)
    );
  }

  private fetchDataIfNotExist() {
    const localCollections = [this.movies, this.categories];
    const isCollectionsMissingData = localCollections.some(
      (collection) => collection.length === 0
    );

    if (isCollectionsMissingData) {
      this.moviesService.findAll();
      this.categoriesService.findAll();
    }
  }
}
