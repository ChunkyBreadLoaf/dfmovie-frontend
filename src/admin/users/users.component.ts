import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { BaseComponent } from '@shared/components/base.component';
import { User } from '@shared/models/users.model';
import { dateForatter } from './users.utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BaseComponent implements OnInit {
  users: User[];

  constructor(private readonly userService: UsersService) {
    super();

    this.users = [];
  }

  ngOnInit(): void {
    this.initStores();
    this.userService.findAll();
  }

  private processUserResponseData(data: User[]): void {
    for (const user of data) {
      const { roles, createdTime, updatedTime } = user;
      const roleNames = (<any[]>roles).map((role) => role.name);

      user.roles = roleNames.join(',');
      user.createdTime = dateForatter(new Date(createdTime));
      user.updatedTime = dateForatter(new Date(updatedTime));
    }

    this.users = data;
  }

  private initStores(): void {
    this.registerStore(this.userService.usersStore$, (data) =>
      this.processUserResponseData(data)
    );
  }
}
