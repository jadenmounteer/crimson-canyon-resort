import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsSectionComponent } from './announcments-section.component';

describe('AnnouncementsSectionComponent', () => {
  let component: AnnouncementsSectionComponent;
  let fixture: ComponentFixture<AnnouncementsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
