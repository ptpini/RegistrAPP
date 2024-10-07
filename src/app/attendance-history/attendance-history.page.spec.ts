import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceHistoryPage } from './attendance-history.page';

describe('AttendanceHistoryPage', () => {
  let component: AttendanceHistoryPage;
  let fixture: ComponentFixture<AttendanceHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
