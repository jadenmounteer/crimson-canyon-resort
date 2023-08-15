import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPostModalComponent } from './add-or-edit-post-modal.component';

describe('AddOrEditPostModalComponent', () => {
  let component: AddOrEditPostModalComponent;
  let fixture: ComponentFixture<AddOrEditPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEditPostModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
