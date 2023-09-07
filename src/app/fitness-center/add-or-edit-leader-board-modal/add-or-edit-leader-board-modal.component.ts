import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/components/auth/auth.service';
import { LeaderBoard } from 'src/app/types/leaderboard';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-or-edit-leader-board-modal',
  templateUrl: './add-or-edit-leader-board-modal.component.html',
  styleUrls: ['./add-or-edit-leader-board-modal.component.scss'],
})
export class AddOrEditLeaderBoardModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board 🏋️‍♀️';
  @Input() leaderBoardToEdit: LeaderBoard | undefined;
  protected loading: boolean = true;
  protected displayErrorMsg: boolean = false;
  protected errorMessage: string =
    'Unable to add leader board. Please reach out to Jaden for help! 😭';

  protected newLeaderBoard: Partial<LeaderBoard> = {
    userId: '',
    createdBy: '',
    name: '',
    leaderBoardEntries: [],
    active: true,
    description: null,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.newLeaderBoard.userId = this.authService.userId;

    if (this.leaderBoardToEdit) {
      this.newLeaderBoard = this.leaderBoardToEdit;
    }
    this.loading = false;
  }

  protected onCreateLeaderBoard() {
    const newLeaderBoardId = this.angularFirestore.createId();

    this.newLeaderBoard.createdDate = Date.now();

    if (this.authService.userDisplayName) {
      this.newLeaderBoard.createdBy = this.authService.userDisplayName;
    }

    // this.announcementsService
    //   .createPost(this.newPost, newLeaderBoardId)
    //   .pipe(
    //     tap((post) => {
    //       this.activeModal.close('success');
    //     }),
    //     catchError((err) => {
    //       this.displayErrorMsg = true;
    //       return throwError(err);
    //     })
    //   )
    //   .subscribe();
  }
}
