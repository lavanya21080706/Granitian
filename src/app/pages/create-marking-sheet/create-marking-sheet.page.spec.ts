import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMarkingSheetPage } from './create-marking-sheet.page';

describe('CreateMarkingSheetPage', () => {
  let component: CreateMarkingSheetPage;
  let fixture: ComponentFixture<CreateMarkingSheetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarkingSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
