import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToCreateAccountPageComponent } from './request-to-create-account-page.component';

describe('RequestToCreateAccountPageComponent', () => {
  let component: RequestToCreateAccountPageComponent;
  let fixture: ComponentFixture<RequestToCreateAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToCreateAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestToCreateAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
