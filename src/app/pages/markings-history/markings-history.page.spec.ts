import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkingsHistoryPage } from './markings-history.page';

describe('MarkingsHistoryPage', () => {
  let component: MarkingsHistoryPage;
  let fixture: ComponentFixture<MarkingsHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkingsHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
