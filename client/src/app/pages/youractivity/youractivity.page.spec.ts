import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YouractivityPage } from './youractivity.page';

describe('YouractivityPage', () => {
  let component: YouractivityPage;
  let fixture: ComponentFixture<YouractivityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YouractivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
