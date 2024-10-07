import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  attendanceRecords: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  async loadAttendanceRecords() {
    this.firestore.collection('attendance', ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges().subscribe(data => {
        this.attendanceRecords = data.map(e => ({
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        }));
      });
  }

  ionViewWillEnter() {
    this.loadAttendanceRecords();
  }
}
