import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WhatsHappeningService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}
}
