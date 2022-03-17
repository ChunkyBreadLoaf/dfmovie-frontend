import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UsersService } from '@services/users.service';
import { AuthService } from '@shared/auth/auth.service';
import { BaseComponent } from '@shared/components/base.component';
import { User } from '@shared/models/users.model';
import { fromEvent } from 'rxjs';
import { isClickedInsideRelatinglements } from './account-dropdown.utils';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent extends BaseComponent implements OnInit {
  private currentUser: User;

  @Input() trigger: HTMLElement;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean>;

  @ViewChild('container')
  private container: ElementRef<HTMLDivElement>;

  get loggedInUser(): User {
    return this.currentUser;
  }

  get isAdmin(): boolean {
    return (this.currentUser.roles as any[]).some(
      (role: any) => role.name === 'Admin'
    );
  }

  private set loggedInUser(user: User) {
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
  }

  private onDocumentClick(event: PointerEvent | Event): void {
    const { nativeElement } = this.container;
    let target = event.target as HTMLElement;

    if (isClickedInsideRelatinglements(target, nativeElement, this.trigger)) {
      return;
    }

    this.visibleChange.emit(false);
  }

  private processUserReponseData(user: User) {
    this.loggedInUser = user;
    console.log(user)
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
