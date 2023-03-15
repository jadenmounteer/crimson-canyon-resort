import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Reservation } from '../types/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  public addNewReservation(newReservation: Reservation) {
    const reservationsRef = this.firestore.collection('reservations');
    reservationsRef.add({ ...newReservation });
  }
}
