import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Reservation } from '../types/reservation';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  public reservations: Array<Reservation> = [];
  public reservationsChanged = new Subject<Reservation[]>();

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  public addNewReservation(newReservation: Reservation) {
    const reservationsRef = this.firestore.collection('reservations');
    reservationsRef.add({ ...newReservation });
  }

  public fetchReservations() {
    const userId = this.authService.userId;
    this.firestore
      .collection('reservations', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map((docArray: any[]) => {
          // Here we map the data coming from the db to be the Quote type.
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              userId: doc.payload.doc.data().userId,
              arrivalDate: doc.payload.doc.data().arrivalDate,
              departureDate: doc.payload.doc.data().departureDate,
              numberOfGuests: doc.payload.doc.data().numberOfGuests,
              numberOfVehicles: doc.payload.doc.data().numberOfVehicles,
              familyName: doc.payload.doc.data().familyName,
              privateVisit: doc.payload.doc.data().privateVisit,
              plansForFood: doc.payload.doc.data().plansForFood,
              additionalInfo: doc.payload.doc.data().additionalInfo,
            };
          });
        })
      )
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
        this.reservationsChanged.next([...this.reservations]);
      });
  }

  public deleteReservation(reservationToDelete: Reservation) {
    const reservationsRef = this.firestore.collection('reservations');
    reservationsRef.doc(reservationToDelete.id).delete();
  }
}
