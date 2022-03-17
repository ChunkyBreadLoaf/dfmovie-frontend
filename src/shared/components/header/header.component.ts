import { CategoriesService, MoviesService } from '@services/proxies';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MovieDto } from '@shared/models/movies.model';
import { CategoryDto } from '@shared/models/categories.model';
import { AuthService } from '@shared/auth/auth.service';
import { User } from '@shared/models/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  categories: CategoryDto[];
  accountDropdownVisible: boolean;

  get isLoggedIn(): boolean {
    return !!this.authService.currentUser;
  }

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService
  ) {
    super();

    this.categories = [];
    this.accountDropdownVisible = false;
  }

  // =============================
  // LIFECYCLE METHODS
  // =============================
  ngOnInit(): void {
    this.initStores();
    this.fetchDataIfNotExist();
  }

  onAccountButtonClick(): void {
    this.accountDropdownVisible = !this.accountDropdownVisible;
  }

  // =============================
  // DATA PROCESSOR METHODS
  // =============================
  private processCategoriesResponseData(data: CategoryDto[]) {
    this.categories = data;
  }

  // =============================
  // UTIL METHODS
  // =============================
  private initStores(): void {
    this.registerStore(this.categoriesService.categoriesStore$, (data) =>
      this.processCategoriesResponseData(data)
    );
  }

  private fetchDataIfNotExist() {
    const localCollections = [this.categories];
    const isCollectionsMissingData = localCollections.some(
      (collection) => collection.length === 0
    );

    if (isCollectionsMissingData) {
      this.categoriesService.findAll();
    }
  }
}
