import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrEditLeaderBoardModalComponent } from '../add-or-edit-leader-board-modal/add-or-edit-leader-board-modal.component';
import { LeaderBoard } from 'src/app/types/leaderboard';
import { LeaderBoardService } from '../leaderBoard.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-leaderboard-section',
  templateUrl: './leaderboard-section.component.html',
  styleUrls: ['./leaderboard-section.component.scss'],
})
export class LeaderboardSectionComponent implements OnInit {
  protected loading: boolean = true;
  protected leaderBoards$!: Observable<LeaderBoard[]>;
  protected userId!: string;
  constructor(
    private modalService: NgbModal,
    private leaderBoardService: LeaderBoardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLeaderBoards();

    if (this.authService.userId) {
      this.userId = this.authService.userId;
    }
  }

  private loadLeaderBoards(): void {
    this.leaderBoards$ = this.leaderBoardService.fetchLeaderBoards();
    this.loading = false;
  }

  protected editLeaderBoard(leaderBoard: LeaderBoard): void {
    const modalRef = this.modalService.open(AddOrEditLeaderBoardModalComponent);
    modalRef.componentInstance.leaderBoardToEdit = leaderBoard;
    modalRef.componentInstance.title = `Edit ${leaderBoard.name}}`;

    modalRef.result.then((result) => {
      if (result === 'success') {
        // this.addedNewPost.emit();
      }
    });
  }

  protected createNewLeaderBoard(): void {
    const modalRef = this.modalService.open(AddOrEditLeaderBoardModalComponent);

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadLeaderBoards();
      }
    });
  }
}
