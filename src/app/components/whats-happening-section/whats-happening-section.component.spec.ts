import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsHappeningSectionComponent } from './whats-happening-section.component';

describe('WhatsHappeningSectionComponent', () => {
  let component: WhatsHappeningSectionComponent;
  let fixture: ComponentFixture<WhatsHappeningSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsHappeningSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsHappeningSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
