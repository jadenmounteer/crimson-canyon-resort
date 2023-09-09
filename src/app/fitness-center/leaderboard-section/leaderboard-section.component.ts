import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrEditLeaderBoardModalComponent } from '../add-or-edit-leader-board-modal/add-or-edit-leader-board-modal.component';
import { LeaderBoard, LeaderBoardEntry } from 'src/app/types/leaderboard';
import { LeaderBoardService } from '../leaderBoard.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AdministrationService } from 'src/app/services/administration.service';
import { AddOrEditEntryModalComponent } from '../add-or-edit-entry.modal/add-or-edit-entry-modal.component';

@Component({
  selector: 'app-leaderboard-section',
  templateUrl: './leaderboard-section.component.html',
  styleUrls: ['./leaderboard-section.component.scss'],
})
export class LeaderboardSectionComponent implements OnInit, OnDestroy {
  protected loading: boolean = true;
  protected leaderBoards$!: Observable<LeaderBoard[]>;
  protected userId!: string;
  protected currentUserIsAdmin$!: Observable<boolean>;
  private authSubscription!: Subscription;

  constructor(
    private modalService: NgbModal,
    private leaderBoardService: LeaderBoardService,
    private authService: AuthService,
    private adminService: AdministrationService
  ) {}
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadLeaderBoards();

    if (this.authService.userId) {
      this.userId = this.authService.userId;
    }

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.grabCurrentUserAdminStatus();
      }
    );
  }

  private grabCurrentUserAdminStatus() {
    if (this.authService.userId) {
      this.currentUserIsAdmin$ = this.adminService.checkIfUserIsAdmin(
        this.authService.userId
      );
    }
  }

  private loadLeaderBoards(): void {
    this.loading = true;
    this.leaderBoards$ = this.leaderBoardService.fetchLeaderBoards();
    this.loading = false;
  }

  protected editLeaderBoard(leaderBoard: LeaderBoard): void {
    const modalRef = this.modalService.open(AddOrEditLeaderBoardModalComponent);
    modalRef.componentInstance.leaderBoardToEdit = leaderBoard;
    modalRef.componentInstance.title = `Edit ${leaderBoard.name}`;

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadLeaderBoards();
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

  protected addOrEditEntry(
    leaderBoard: LeaderBoard,
    entryToEdit: LeaderBoardEntry | undefined = undefined
  ): void {
    const modalRef = this.modalService.open(AddOrEditEntryModalComponent);
    modalRef.componentInstance.leaderBoard = leaderBoard;
    if (entryToEdit) {
      modalRef.componentInstance.entryToEdit = entryToEdit;
      modalRef.componentInstance.title = `Editing ${entryToEdit.individualName}'s entry for ${leaderBoard.name}`;
    }

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadLeaderBoards();
      }
    });
  }
}
