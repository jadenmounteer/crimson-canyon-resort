import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailabilityMenu } from './check-availability-menu.component';

describe('CheckAvailabilityMenu', () => {
  let component: CheckAvailabilityMenu;
  let fixture: ComponentFixture<CheckAvailabilityMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckAvailabilityMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckAvailabilityMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
