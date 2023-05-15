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
}
