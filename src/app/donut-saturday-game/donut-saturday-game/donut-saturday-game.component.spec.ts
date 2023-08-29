import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutSaturdayGameComponent } from './donut-saturday-game.component';

describe('DonutSaturdayGameComponent', () => {
  let component: DonutSaturdayGameComponent;
  let fixture: ComponentFixture<DonutSaturdayGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutSaturdayGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutSaturdayGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
