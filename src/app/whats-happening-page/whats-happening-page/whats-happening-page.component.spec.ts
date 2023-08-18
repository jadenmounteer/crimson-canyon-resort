import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsHappeningPageComponent } from './whats-happening-page.component';

describe('WhatsHappeningPageComponent', () => {
  let component: WhatsHappeningPageComponent;
  let fixture: ComponentFixture<WhatsHappeningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsHappeningPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsHappeningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
