import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationsSectionComponent } from './my-reservations-section.component';

describe('MyReservationsSectionComponent', () => {
  let component: MyReservationsSectionComponent;
  let fixture: ComponentFixture<MyReservationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservationsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReservationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
