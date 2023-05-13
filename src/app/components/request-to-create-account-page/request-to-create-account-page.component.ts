import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccessRequest } from 'src/app/types/access-request';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-request-to-create-account-page',
  templateUrl: './request-to-create-account-page.component.html',
  styleUrls: ['./request-to-create-account-page.component.scss'],
})
export class RequestToCreateAccountPageComponent implements OnInit {
  protected requestSent: boolean = false;
  protected requestSentMessage: string = '';
  constructor(
    private angularFirestore: AngularFirestore,
    private authorizedEmailsService: AuthorizedEmailsService
  ) {}

  ngOnInit(): void {}

  protected onSubmit(form: NgForm): void {
    const newRequestId = this.angularFirestore.createId();
    const newRequest: Partial<AccessRequest> = {
      email: form.value.email,
      name: form.value.yourName,
      approved: false,
    };

    this.authorizedEmailsService
      .createPendingRequest(newRequest, newRequestId)
      .pipe(
        tap((newRequest) => {
          this.requestSent = true;
          this.requestSentMessage = `Your request has been sent. You will receive an email at ${form.value.email} once your request has been approved.`;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe();
  }
}
