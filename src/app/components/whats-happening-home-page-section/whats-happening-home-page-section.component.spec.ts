import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsHappeningHomePageSectionComponent } from './whats-happening-home-page-section.component';

describe('WhatsHappeningHomePageSectionComponent', () => {
  let component: WhatsHappeningHomePageSectionComponent;
  let fixture: ComponentFixture<WhatsHappeningHomePageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsHappeningHomePageSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsHappeningHomePageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
