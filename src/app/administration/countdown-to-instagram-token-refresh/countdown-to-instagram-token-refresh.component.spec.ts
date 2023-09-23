import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownToInstagramTokenRefreshComponent } from './countdown-to-instagram-token-refresh.component';

describe('CountdownToInstagramTokenRefreshComponent', () => {
  let component: CountdownToInstagramTokenRefreshComponent;
  let fixture: ComponentFixture<CountdownToInstagramTokenRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownToInstagramTokenRefreshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownToInstagramTokenRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
