import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PendingRequest } from 'src/app/types/pending-request';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-request-to-create-account-page',
  templateUrl: './request-to-create-account-page.component.html',
  styleUrls: ['./request-to-create-account-page.component.scss'],
})
export class RequestToCreateAccountPageComponent implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private authorizedEmailsService: AuthorizedEmailsService
  ) {}

  ngOnInit(): void {}

  protected onSubmit(form: NgForm): void {
    const newRequestId = this.angularFirestore.createId();
    const newRequest: Partial<PendingRequest> = {
      email: form.value.email,
      name: form.value.yourName,
    };

    this.authorizedEmailsService
      .createPendingRequest(newRequest, newRequestId)
      .pipe(
        tap((newRequest) => {
          // this.activeModal.close('success');
        }),
        catchError((err) => {
          // this.displayErrorMsg = true;
          return throwError(err);
        })
      )
      .subscribe();
  }
}
