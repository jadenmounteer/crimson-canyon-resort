import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LeaderBoard, LeaderBoardEntry } from 'src/app/types/leaderboard';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-add-or-edit-entry-modal',
  templateUrl: './add-or-edit-entry-modal.component.html',
  styleUrls: ['./add-or-edit-entry-modal.component.scss'],
})
export class AddOrEditEntryModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board Entry 🏋️‍♀️';
  @Input() leaderBoard!: LeaderBoard;
  @Input() entryToEdit: LeaderBoardEntry | undefined;
  protected displayErrorMsg: boolean = false;
  protected errorMessage: string =
    'Unable to add leader board entry. Please reach out to Jaden for help! 😭';
  protected loading: boolean = true;
  protected editingExistingEntry: boolean = false;

  protected newEntry: Partial<LeaderBoardEntry> = {
    userId: '',
    individualName: '',
    date: new Date(),
    scoreInMinutes: 0,
    scoreInSeconds: 0,
    scoreInMilliseconds: 0,
    scoreInReps: 0,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    public icon: IconService
  ) {}

  ngOnInit(): void {
    this.newEntry.userId = this.authService.userId;
    if (this.authService.userDisplayName) {
      this.newEntry.individualName = this.authService.userDisplayName;
    }

    if (this.entryToEdit) {
    }
    this.newEntry = { ...this.entryToEdit };

    this.loading = false;
  }
}
