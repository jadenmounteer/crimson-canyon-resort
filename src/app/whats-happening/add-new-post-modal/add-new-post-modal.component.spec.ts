import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPostModalComponent } from './add-new-post-modal.component';

describe('AddNewPostModalComponent', () => {
  let component: AddNewPostModalComponent;
  let fixture: ComponentFixture<AddNewPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPostModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
