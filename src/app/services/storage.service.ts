import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private attendanceRecords: any[] = [];

  constructor() {}

  addAttendanceRecord(record: any) {
    this.attendanceRecords.push(record);
  }

  getAttendanceRecords() {
    return this.attendanceRecords;
  }
}
