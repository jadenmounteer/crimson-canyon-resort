import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Reservation } from '../types/reservation';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  public reservations: Array<Reservation> = [];
  public reservationsChanged = new Subject<Reservation[]>();
  public allReservationsChanged = new Subject<Reservation[]>();
  public allReservations: Array<Reservation> = [];

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
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

  public fetchAllReservations() {
    const userId = this.authService.userId;
    this.firestore
      .collection('reservations')
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
        this.allReservations = reservations;
        this.allReservationsChanged.next([...this.allReservations]);
      });
  }

  public getReservation(id: string | null): Reservation {
    let reservationToReturn!: Reservation;
    this.reservations.forEach((reservation) => {
      if (reservation.id === id) {
        reservationToReturn = reservation;
      }
    });

    return reservationToReturn;
  }

  public deleteReservation(reservationToDelete: Reservation) {
    const reservationsRef = this.firestore.collection('reservations');
    reservationsRef.doc(reservationToDelete.id).delete();
  }

  public updateReservation(reservationToUpdate: Reservation) {
    const reservationsRef = this.firestore.collection('reservations');
    reservationsRef.doc(reservationToUpdate.id).update({
      arrivalDate: reservationToUpdate.arrivalDate,
      departureDate: reservationToUpdate.departureDate,
      numberOfGuests: reservationToUpdate.numberOfGuests,
      numberOfVehicles: reservationToUpdate.numberOfVehicles,
      familyName: reservationToUpdate.familyName,
      privateVisit: reservationToUpdate.privateVisit,
      plansForFood: reservationToUpdate.plansForFood,
      additionalInfo: reservationToUpdate.additionalInfo,
    });
  }

  public viewReservationDetails(reservation: Reservation) {
    this.router.navigate([`reservation-details-page/${reservation.id}`]);
  }
}
