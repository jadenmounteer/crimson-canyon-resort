import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LeaderBoard, LeaderBoardEntry } from 'src/app/types/leaderboard';

@Component({
  selector: 'app-add-or-edit-entry-modal',
  templateUrl: './add-or-edit-entry-modal.component.html',
  styleUrls: ['./add-or-edit-entry-modal.component.scss'],
})
export class AddOrEditEntryModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board Entry 🏋️‍♀️';
  @Input() leaderBoard!: LeaderBoard;

  protected newEntry: Partial<LeaderBoardEntry> = {
    userId: '',
    individualName: '',
    date: new Date(),
    score: 0,
  };

  protected loading: boolean = true;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.checkIfEntryExists();
    this.loading = false;
  }

  private checkIfEntryExists() {
    // TODO check if an entry exists for this user on this leaderboard
    // TODO set the entry data and title accordingly
  }
}
