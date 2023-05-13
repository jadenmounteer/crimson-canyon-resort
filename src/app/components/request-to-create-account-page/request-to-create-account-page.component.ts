import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccessRequest } from 'src/app/types/access-request';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-request-to-create-account-page',
  templateUrl: './request-to-create-account-page.component.html',
  styleUrls: ['./request-to-create-account-page.component.scss'],
})
export class RequestToCreateAccountPageComponent implements OnInit {
  protected requestSent: boolean = false;
  protected requestSentMessage: string = '';
  protected accessRequests$!: Observable<AccessRequest[]>;
  protected contentLoaded: boolean = false;
  protected requests!: Array<AccessRequest>;
  protected emailExistsMsg: string = '';
  constructor(
    private angularFirestore: AngularFirestore,
    private authorizedEmailsService: AuthorizedEmailsService
  ) {
    this.loadAccessRequests();
  }

  ngOnInit(): void {}

  protected onSubmit(form: NgForm): void {
    const emailExists: boolean = this.checkIfRequestExists(form.value.email);

    // If so, is it approved?

    if (!emailExists) {
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

  private checkIfRequestExists(emailToCheckFor: string): boolean {
    this.emailExistsMsg = '';
    for (let i = 0; i < this.requests.length; i++) {
      if (
        this.requests[i].email === emailToCheckFor &&
        this.requests[i].approved
      ) {
        this.emailExistsMsg = `This email address ${emailToCheckFor} has already been approved for account creation.`;
        return true;
      }

      if (
        this.requests[i].email === emailToCheckFor &&
        !this.requests[i].approved
      ) {
        this.emailExistsMsg = `A request for the email address ${emailToCheckFor} is already currently pending `;
        return true;
      }
    }
    return false;
  }

  protected loadAccessRequests(): void {
    this.accessRequests$ = this.authorizedEmailsService.fetchRequests();

    this.accessRequests$.subscribe((requests) => (this.requests = requests));

    this.contentLoaded = true;
  }
}
