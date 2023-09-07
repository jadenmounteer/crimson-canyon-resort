import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHomePageSectionComponent } from './fitness-home-page-section.component';

describe('FitnessHomePageSectionComponent', () => {
  let component: FitnessHomePageSectionComponent;
  let fixture: ComponentFixture<FitnessHomePageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitnessHomePageSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessHomePageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
