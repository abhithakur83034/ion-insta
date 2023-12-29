import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterotpPage } from './enterotp.page';

describe('EnterotpPage', () => {
  let component: EnterotpPage;
  let fixture: ComponentFixture<EnterotpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnterotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
