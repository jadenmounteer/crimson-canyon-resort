import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from 'src/app/services/db-utils';
import { Message } from 'src/app/types/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationChatService {
  constructor(private firestore: AngularFirestore, private router: Router) {}

  public createMessage(newMessage: Partial<Message>, messageId: string) {
    const createPostObs$ = from(
      this.firestore
        .doc(`reservation-chat-messages/${messageId}`)
        .set(newMessage)
    );

    return createPostObs$.pipe(
      map((res) => {
        return {
          id: messageId,
          ...newMessage,
        };
      })
    );
  }

  public deleteMessage(messageId: string): Observable<void> {
    return from(
      this.firestore.doc(`reservation-chat-messages//${messageId}`).delete()
    );
  }

  public fetchMessagesBasedOnReservationId(
    reservationId: string
  ): Observable<Message[]> {
    return this.firestore
      .collection('reservation-chat-messages', (ref) =>
        ref.where('reservationId', '==', reservationId)
      )
      .get()
      .pipe(map((result) => convertSnaps<Message>(result)));
  }

  public updateMessage(
    messageId: string,
    changes: Partial<Message>
  ): Observable<any> {
    return from(
      this.firestore
        .doc(`reservation-chat-messages//${messageId}`)
        .update(changes)
    );
  }
}
