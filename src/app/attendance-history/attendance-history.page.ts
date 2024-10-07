import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.page.html',
  styleUrls: ['./attendance-history.page.scss'],
})
export class AttendanceHistoryPage implements OnInit {
  attendanceRecords: Observable<any[]> | undefined;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadAttendanceHistory();
  }

  loadAttendanceHistory() {
    this.attendanceRecords = this.firestore
      .collection('attendance', ref => ref.orderBy('timestamp', 'desc'))
      .valueChanges({ idField: 'id' });
  }
}
