import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAuthorizationRequestsComponent } from './pending-authorization-requests.component';

describe('PendingAuthorizationRequestsComponent', () => {
  let component: PendingAuthorizationRequestsComponent;
  let fixture: ComponentFixture<PendingAuthorizationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAuthorizationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAuthorizationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
