import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailforgotpasseordPage } from './emailforgotpasseord.page';

describe('EmailforgotpasseordPage', () => {
  let component: EmailforgotpasseordPage;
  let fixture: ComponentFixture<EmailforgotpasseordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailforgotpasseordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
