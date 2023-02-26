import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTripPageComponent } from './reserve-trip-page.component';

describe('ReserveTripPageComponent', () => {
  let component: ReserveTripPageComponent;
  let fixture: ComponentFixture<ReserveTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveTripPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
