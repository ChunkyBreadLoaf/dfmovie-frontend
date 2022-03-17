import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({ template: '' })
export class BaseComponent {
  private ngDestroy$: Subject<void>;

  constructor() {
    this.ngDestroy$ = new Subject();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }

  registerStore<T>(store: Observable<T>, processor: (data: T) => void) {
    store.pipe(takeUntil(this.ngDestroy$)).subscribe(processor);
  }
}
