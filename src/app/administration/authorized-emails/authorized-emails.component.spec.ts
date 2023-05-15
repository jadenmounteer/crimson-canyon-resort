import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedEmailsComponent } from './authorized-emails.component';

describe('AuthorizedEmailsComponent', () => {
  let component: AuthorizedEmailsComponent;
  let fixture: ComponentFixture<AuthorizedEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizedEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
