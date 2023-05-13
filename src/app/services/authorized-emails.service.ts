import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccessRequest } from '../types/access-request';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedEmailsService {
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
}
