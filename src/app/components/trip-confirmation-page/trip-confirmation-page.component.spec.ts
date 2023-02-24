import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripConfirmationPageComponent } from './trip-confirmation-page.component';

describe('TripConfirmationPageComponent', () => {
  let component: TripConfirmationPageComponent;
  let fixture: ComponentFixture<TripConfirmationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripConfirmationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
