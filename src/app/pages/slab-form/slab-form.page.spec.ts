import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlabFormPage } from './slab-form.page';

describe('SlabFormPage', () => {
  let component: SlabFormPage;
  let fixture: ComponentFixture<SlabFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
