import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/types/reservation';
import { ReservationChatService } from './reservation-chat.service';
import { Observable, catchError, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-reservation-chat',
  templateUrl: './reservation-chat.component.html',
  styleUrls: ['./reservation-chat.component.scss'],
})
export class ReservationChatComponent implements OnInit {
  @Input() reservationID!: string;
  @Input() userID: string | undefined;
  @Input() userEmail: string | null | undefined;
  @Input() userName: string | undefined | null;
  protected messages$!: Observable<Message[]>;
  protected newMessage: Partial<Message> = { message: '' };

  constructor(
    private chatService: ReservationChatService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  private loadMessages(): void {
    this.messages$ = this.chatService.fetchMessagesBasedOnReservationId(
      this.reservationID
    );
  }

  protected onAddMessage(): void {
    this.newMessage.userId = this.userID;
    this.newMessage.reservationId = this.reservationID;
    this.newMessage.userEmail = this.userEmail;
    this.newMessage.userName = this.userName;
    const messageId = this.angularFirestore.createId();

    this.newMessage.createdDate = Date.now();

    this.chatService
      .createMessage(this.newMessage, messageId)
      // .pipe(
      //   catchError((err) => {
      //     // this.displayErrorMsg = true;
      //     // return throwError(err);
      //   })
      // )
      .subscribe(() => {
        this.newMessage.message = '';
      });
  }
}
