import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingssPage } from './settingss.page';

describe('SettingssPage', () => {
  let component: SettingssPage;
  let fixture: ComponentFixture<SettingssPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
