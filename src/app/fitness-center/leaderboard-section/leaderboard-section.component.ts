import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrEditLeaderBoardModalComponent } from '../add-or-edit-leader-board-modal/add-or-edit-leader-board-modal.component';
import { LeaderBoard } from 'src/app/types/leaderboard';

@Component({
  selector: 'app-leaderboard-section',
  templateUrl: './leaderboard-section.component.html',
  styleUrls: ['./leaderboard-section.component.scss'],
})
export class LeaderboardSectionComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

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
        // this.addedNewPost.emit();
      }
    });
  }
}
