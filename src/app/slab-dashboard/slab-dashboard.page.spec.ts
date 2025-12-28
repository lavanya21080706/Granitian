import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlabDashboardPage } from './slab-dashboard.page';

describe('SlabDashboardPage', () => {
  let component: SlabDashboardPage;
  let fixture: ComponentFixture<SlabDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
