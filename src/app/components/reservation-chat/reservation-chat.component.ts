import { Component, Input, OnInit } from '@angular/core';
import { Message, Reservation } from 'src/app/types/reservation';
import { ReservationChatService } from './reservation-chat.service';
import { Observable } from 'rxjs';
import { z } from 'zod';

@Component({
  selector: 'app-reservation-chat',
  templateUrl: './reservation-chat.component.html',
  styleUrls: ['./reservation-chat.component.scss'],
})
export class ReservationChatComponent implements OnInit {
  @Input() reservationID!: string;
  protected messages$!: Observable<Message[]>;
  protected newMessage: Partial<Message> = {};

  constructor(private chatService: ReservationChatService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  private loadMessages(): void {
    this.messages$ = this.chatService.fetchMessagesBasedOnReservationId(
      this.reservationID
    );
  }
}
