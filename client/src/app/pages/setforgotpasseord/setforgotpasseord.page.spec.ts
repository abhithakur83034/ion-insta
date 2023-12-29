import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetforgotpasseordPage } from './setforgotpasseord.page';

describe('SetforgotpasseordPage', () => {
  let component: SetforgotpasseordPage;
  let fixture: ComponentFixture<SetforgotpasseordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetforgotpasseordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
