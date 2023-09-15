import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';
import { AuthService } from '../auth/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { DatePickerService } from 'src/app/services/date-picker.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit, OnDestroy {
  protected todaysDate!: NgbDate;
  public contentLoaded: boolean = false;
  public reservation!: Reservation;
  public isAuth: boolean = false;
  private authSubscription!: Subscription;
  protected editing: boolean = false;
  public datePickerLoading$!: Subscription;

  constructor(
    public icon: IconService,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    protected datePickerService: DatePickerService
  ) {
    this.todaysDate = this.datePickerService.getTodaysDate();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.datePickerLoading$.unsubscribe();
  }

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

      this.datePickerLoading$ =
        this.datePickerService.datePickerLoading$.subscribe((loading) => {
          this.contentLoaded = !loading;
        });
    });
  }

  public onChangeReservation(form: NgForm) {
    const updatedReservation: Reservation = {
      id: this.reservation.id,
      userId: this.authService.userId,
      arrivalDate: form.value.arrivalDate,
      departureDate: form.value.departureDate,
      numberOfGuests: form.value.numberOfGuests,
      numberOfVehicles: form.value.numberOfVehicles,
      familyName: form.value.familyName,
      privateVisit: form.value.privateVisit,
      plansForFood: form.value.plansForFood,
      additionalInfo: form.value.additionalInfo,
    };

    this.reservationsService.updateReservation(updatedReservation);
    this.editing = false;
  }

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
        this.reservationsService.deleteReservation(this.reservation);
        this.router.navigate(['my-reservations-page']);
      }
    });
  }

  public onClickEditButton() {
    this.editing = true;
  }
}
