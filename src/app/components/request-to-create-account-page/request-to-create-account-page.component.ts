import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-to-create-account-page',
  templateUrl: './request-to-create-account-page.component.html',
  styleUrls: ['./request-to-create-account-page.component.scss'],
})
export class RequestToCreateAccountPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  protected onSubmit(form: NgForm): void {}
}
