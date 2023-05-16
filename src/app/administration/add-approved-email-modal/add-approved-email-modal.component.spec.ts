import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovedEmailModalComponent } from './add-approved-email-modal.component';

describe('AddApprovedEmailModalComponent', () => {
  let component: AddApprovedEmailModalComponent;
  let fixture: ComponentFixture<AddApprovedEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprovedEmailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprovedEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
