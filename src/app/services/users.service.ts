import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { convertSnaps } from './db-utils';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  public fetchUsers(): Observable<User[]> {
    return this.firestore
      .collection('users')
      .get()
      .pipe(map((result) => convertSnaps<User>(result)));
  }
}
