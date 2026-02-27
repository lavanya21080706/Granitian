import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareHistoryModalPage } from './share-history-modal.page';

describe('ShareHistoryModalPage', () => {
  let component: ShareHistoryModalPage;
  let fixture: ComponentFixture<ShareHistoryModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareHistoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
