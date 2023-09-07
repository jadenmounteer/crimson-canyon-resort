import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaderBoard } from 'src/app/types/leaderboard';

@Component({
  selector: 'app-add-or-edit-leader-board-modal',
  templateUrl: './add-or-edit-leader-board-modal.component.html',
  styleUrls: ['./add-or-edit-leader-board-modal.component.scss'],
})
export class AddOrEditLeaderBoardModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board 🏋️‍♀️';
  @Input() leaderBoardToEdit: LeaderBoard | undefined;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
