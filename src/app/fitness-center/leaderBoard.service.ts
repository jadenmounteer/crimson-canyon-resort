import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';

import { Observable, from, map } from 'rxjs';
import { convertSnaps } from '../services/db-utils';
import { User } from '../types/user';
import { LeaderBoard } from '../types/leaderboard';

@Injectable({
  providedIn: 'root',
})
export class LeaderBoardService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  public createLeaderBoard(
    newLeaderBoard: Partial<LeaderBoard>,
    leaderBoardId: string
  ) {
    const createLeaderBoardObs$ = from(
      this.firestore.doc(`leader-boards/${leaderBoardId}`).set(newLeaderBoard)
    );

    return createLeaderBoardObs$.pipe(
      map((res) => {
        return {
          id: leaderBoardId,
          ...newLeaderBoard,
        };
      })
    );
  }

  public fetchLeaderBoards(): Observable<LeaderBoard[]> {
    return this.firestore
      .collection('leader-boards', (ref) => ref.orderBy('createdDate', 'desc'))
      .get()
      .pipe(map((result) => convertSnaps<LeaderBoard>(result)));
  }

  public updateLeaderBoard(
    leaderBoardId: string,
    changes: Partial<LeaderBoard>
  ): Observable<any> {
    return from(
      this.firestore.doc(`leader-boards/${leaderBoardId}`).update(changes)
    );
  }

  public deleteLeaderBoard(leaderBoardId: string): Observable<void> {
    return from(this.firestore.doc(`leader-boards/${leaderBoardId}`).delete());
  }
}
