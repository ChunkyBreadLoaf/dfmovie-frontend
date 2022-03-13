import { Observable, Subject, takeUntil } from 'rxjs';

export class BaseComponent {
  private ngDestroy$: Subject<void>;

  constructor() {
    this.ngDestroy$ = new Subject();
  }

  registerStore<T>(store: Observable<T>, processor: (data: T) => void) {
    store.pipe(takeUntil(this.ngDestroy$)).subscribe(processor);
  }
}
