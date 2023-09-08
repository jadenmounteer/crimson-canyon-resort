import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEntryModalComponent } from './add-or-edit-entry-modal.component';

describe('AddOrEditEntryModalComponent', () => {
  let component: AddOrEditEntryModalComponent;
  let fixture: ComponentFixture<AddOrEditEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditEntryModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
