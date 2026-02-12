import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GranitianHeaderPage } from './granitian-header.page';

describe('GranitianHeaderPage', () => {
  let component: GranitianHeaderPage;
  let fixture: ComponentFixture<GranitianHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GranitianHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
