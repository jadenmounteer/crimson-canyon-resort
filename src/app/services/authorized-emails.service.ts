import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AccessRequest } from '../types/access-request';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from './db-utils';

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
}
