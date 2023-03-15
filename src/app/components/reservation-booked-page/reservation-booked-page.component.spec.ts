import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationBookedPageComponent } from './reservation-booked-page.component';

describe('ReservationBookedPageComponent', () => {
  let component: ReservationBookedPageComponent;
  let fixture: ComponentFixture<ReservationBookedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationBookedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationBookedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
