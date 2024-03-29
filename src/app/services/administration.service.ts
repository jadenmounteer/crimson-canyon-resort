import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Reservation } from '../types/reservation';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  // TODO Add this array to the db
  private administratorIds: string[] = [
    'qHZkXAhQuLa0N21MPkCdu72pfvw2',
    'wDxAyqOoslWFam9z7tbKTU5bI2I2',
    'MRNzGOH6PTUCkMk7QDXtPRhEd1g2',
    'WT5pLNuHdNZgdVeADcCq8d15per1',
  ];
  private currentUserId: string | undefined;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.userId;
  }

  public checkIfUserIsAdmin(userId: string): Observable<boolean> {
    let userIsAdmin: boolean = false;

    if (this.administratorIds.includes(userId)) {
      userIsAdmin = true;
    } else {
      userIsAdmin = false;
    }

    return of(userIsAdmin);
  }
}
