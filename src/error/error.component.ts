import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  statusCode: number;
  message: string;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.statusCode = 404;
    this.message = 'Page not found'
  }

  async ngOnInit(): Promise<void> {
    const { statusCode, message } = await firstValueFrom(this.activatedRoute.queryParams);

    this.statusCode = statusCode;
    this.message = message;
  }
}
