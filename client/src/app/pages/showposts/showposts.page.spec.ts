import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowpostsPage } from './showposts.page';

describe('ShowpostsPage', () => {
  let component: ShowpostsPage;
  let fixture: ComponentFixture<ShowpostsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowpostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
