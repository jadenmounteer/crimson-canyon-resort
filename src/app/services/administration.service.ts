import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Reservation } from '../types/reservation';
import { map } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  // TODO Add this array to the db
  private administratorIds: string[] = ['NzBQdjuDQ2ZnkQZgb3sYWiDp8f82'];
  private currentUserId: string | undefined;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.userId;
    console.log(this.currentUserId);
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
