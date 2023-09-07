import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/components/auth/auth.service';
import { LeaderBoard } from 'src/app/types/leaderboard';

@Component({
  selector: 'app-add-or-edit-leader-board-modal',
  templateUrl: './add-or-edit-leader-board-modal.component.html',
  styleUrls: ['./add-or-edit-leader-board-modal.component.scss'],
})
export class AddOrEditLeaderBoardModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board 🏋️‍♀️';
  @Input() leaderBoardToEdit: LeaderBoard | undefined;
  protected loading: boolean = true;

  protected newLeaderBoard: Partial<LeaderBoard> = {
    userId: '',
    createdBy: '',
    name: '',
    leaderBoardEntries: [],
    active: true,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.newLeaderBoard.userId = this.authService.userId;
    if (this.leaderBoardToEdit) {
      this.newLeaderBoard = this.leaderBoardToEdit;
    }
    this.loading = false;
  }
}
