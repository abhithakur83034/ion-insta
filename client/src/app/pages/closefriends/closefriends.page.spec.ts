import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClosefriendsPage } from './closefriends.page';

describe('ClosefriendsPage', () => {
  let component: ClosefriendsPage;
  let fixture: ComponentFixture<ClosefriendsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClosefriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
