import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) {
    this.loginForm = formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  onFormSubmit(value: any) {
    this.authService.login(value);
  }

  ngOnInit(): void {
  }

}
