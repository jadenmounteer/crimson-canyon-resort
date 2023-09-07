import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardSectionComponent } from './leaderboard-section.component';

describe('LeaderboardSectionComponent', () => {
  let component: LeaderboardSectionComponent;
  let fixture: ComponentFixture<LeaderboardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
