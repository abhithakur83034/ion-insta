import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowsingleprofilePage } from './showsingleprofile.page';

describe('ShowsingleprofilePage', () => {
  let component: ShowsingleprofilePage;
  let fixture: ComponentFixture<ShowsingleprofilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowsingleprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
