import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/shared/service-proxies/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private readonly user = {
    "firstName": "Lem",
    "lastName": "Soriano",
    "email": "admin3@gmail.com",
    "roles": ["621bad6ef8aeabba9de76d52"],
    "username": "LemS",
    "password": "Password01"
}

  constructor(private readonly userService: UsersService) { }

  ngOnInit(): void {
  }

  onBtnClick(): void {
    this.userService.update("6224a9640e9965aef511378a", this.user);
  }

}
