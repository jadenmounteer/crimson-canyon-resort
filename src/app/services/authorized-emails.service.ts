import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccessRequest } from '../types/access-request';
import { Observable, from, map, Subject } from 'rxjs';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedEmailsService {
  public requestsChanged = new Subject();
  constructor(private firestore: AngularFirestore) {}

  public createPendingRequest(
    newRequest: Partial<AccessRequest>,
    requestId: string
  ) {
    const createPendingRequestObs$ = from(
      this.firestore.doc(`accessRequests/${requestId}`).set(newRequest)
    );

    return createPendingRequestObs$.pipe(
      map((res) => {
        return {
          id: requestId,
          ...newRequest,
        };
      })
    );
  }

  public fetchRequests(): Observable<AccessRequest[]> {
    return this.firestore
      .collection('accessRequests')
      .get()
      .pipe(map((result) => convertSnaps<AccessRequest>(result)));
  }

  public fetchPendingRequests(): Observable<AccessRequest[]> {
    return this.firestore
      .collection('accessRequests', (ref) => ref.where('approved', '==', false))
      .get()
      .pipe(map((result) => convertSnaps<AccessRequest>(result)));
  }

  public fetchApprovedRequests(): Observable<AccessRequest[]> {
    return this.firestore
      .collection('accessRequests', (ref) => ref.where('approved', '==', true))
      .get()
      .pipe(map((result) => convertSnaps<AccessRequest>(result)));
  }

  public updateRequest(
    requestId: string,
    changes: Partial<AccessRequest>
  ): Observable<any> {
    return from(
      this.firestore.doc(`accessRequests/${requestId}`).update(changes)
    );
  }

  public deleteRequest(requestId: string): Observable<void> {
    return from(this.firestore.doc(`accessRequests/${requestId}`).delete());
  }

  public checkIfValidEmail(email: string): boolean {
    const regexCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regexCheck.test(email)) {
      return false;
    }

    return true;
  }

  public checkIfRequestExists(
    emailToCheckFor: string,
    requests: Array<AccessRequest>
  ): string {
    let emailExistsMsg = '';
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].email === emailToCheckFor && requests[i].approved) {
        emailExistsMsg = `This email address ${emailToCheckFor} has already been approved for account creation.`;
        return emailExistsMsg;
      }

      if (requests[i].email === emailToCheckFor && !requests[i].approved) {
        emailExistsMsg = `A request for the email address ${emailToCheckFor} is currently pending `;
      }
    }
    return emailExistsMsg;
  }
}
