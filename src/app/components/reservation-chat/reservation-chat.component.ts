import { Component, Input, OnInit } from '@angular/core';
import { Message, Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-reservation-chat',
  templateUrl: './reservation-chat.component.html',
  styleUrls: ['./reservation-chat.component.scss'],
})
export class ReservationChatComponent implements OnInit {
  messages: Message[] = [];
  constructor() {}

  ngOnInit(): void {}
}
