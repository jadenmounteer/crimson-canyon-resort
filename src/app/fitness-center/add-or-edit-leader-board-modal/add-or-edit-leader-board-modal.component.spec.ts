import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditLeaderBoardModalComponent } from './add-or-edit-leader-board-modal.component';

describe('AddOrEditLeaderBoardModalComponent', () => {
  let component: AddOrEditLeaderBoardModalComponent;
  let fixture: ComponentFixture<AddOrEditLeaderBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditLeaderBoardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditLeaderBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
