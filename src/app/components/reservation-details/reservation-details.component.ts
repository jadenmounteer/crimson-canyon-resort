import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';
import { AuthService } from '../auth/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  public contentLoaded: boolean = false;
  protected reservation!: Reservation;
  public isAuth: boolean = false;
  private authSubscription!: Subscription;
  protected editing: boolean = false;

  constructor(
    public icon: IconService,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
    if (this.authService.isAuthenticated) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.route.paramMap.subscribe((params) => {
      let id: string | null = params.get('id');
      this.reservation = this.reservationsService.getReservation(id);
      this.contentLoaded = true;
    });
  }

  public onChangeReservation(form: NgForm) {}

  protected askUserIfWantToEdit() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Do you want to edit this reservation?`;
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.editing = true;
      }
    });
  }

  public onDeleteReservation() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to cancel this reservation?`;
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        // Delete the reservation...
      }
    });
  }

  public onClickEditButton() {
    this.editing = true;
  }
}
