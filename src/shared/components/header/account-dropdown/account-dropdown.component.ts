import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UsersService } from '@services/users.service';
import { AuthService } from '@shared/auth/auth.service';
import { BaseComponent } from '@shared/components/base.component';
import { User } from '@shared/models/users.model';
import { fromEvent } from 'rxjs';
import { isClickedInsideRelatingElements } from './account-dropdown.utils';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent extends BaseComponent implements OnInit {
  private currentUser: User | undefined;

  @Input() trigger: HTMLElement;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean>;

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement>;

  get loggedInUser(): User | undefined {
    return this.currentUser;
  }

  get isAdmin(): boolean {
    return (this.currentUser!.roles as any[]).some(
      (role: any) => role.name === 'Admin'
    );
  }

  private set loggedInUser(user: User | undefined) {
    this.currentUser = user;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {
    super();

    this.visible = false;
    this.visibleChange = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.initStores();
  }

  onLogOutClick() {
    this.authService.logout();
    this.loggedInUser = undefined;
  }

  private onDocumentClick(event: PointerEvent | Event): void {
    if (this.container) {
      const { nativeElement } = this.container;
      const target = event.target as HTMLElement;

      if (isClickedInsideRelatingElements(target, nativeElement, this.trigger)) {
        return;
      }

      this.visibleChange.emit(false);
    }
  }

  private processUserReponseData(user: User) {
    if (!this.loggedInUser?._id) {
      this.loggedInUser = user;
    }
  }

  private initStores(): void {
    this.registerStore(
      fromEvent(document, 'click'),
      (event: PointerEvent | Event) => this.onDocumentClick(event)
    );

    this.registerStore(this.userService.userStore$, (data) =>
      this.processUserReponseData(data)
    );
  }
}
