import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FollowerFollowingPage } from './follower-following.page';

describe('FollowerFollowingPage', () => {
  let component: FollowerFollowingPage;
  let fixture: ComponentFixture<FollowerFollowingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FollowerFollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
