import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendRequestPage } from './friend-requests.page';

describe('FriendRequestPage', () => {
  let component: FriendRequestPage;
  let fixture: ComponentFixture<FriendRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
