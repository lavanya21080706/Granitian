import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlabsPage } from './slabs.page';

describe('SlabsPage', () => {
  let component: SlabsPage;
  let fixture: ComponentFixture<SlabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
