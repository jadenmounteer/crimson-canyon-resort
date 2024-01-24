import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationChatComponent } from './reservation-chat.component';

describe('ReservationChatComponent', () => {
  let component: ReservationChatComponent;
  let fixture: ComponentFixture<ReservationChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
