import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsByUserComponent } from './reservations-by-user.component';

describe('ReservationsByUserComponent', () => {
  let component: ReservationsByUserComponent;
  let fixture: ComponentFixture<ReservationsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
