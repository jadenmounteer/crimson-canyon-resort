import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessCenterPageComponent } from './fitness-center-page.component';

describe('FitnessCenterPageComponent', () => {
  let component: FitnessCenterPageComponent;
  let fixture: ComponentFixture<FitnessCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitnessCenterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
