import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async saveAttendance(data: string) {
    const timestamp = new Date().toISOString();
    await this.storage.set(timestamp, data);
  }

  async getAttendanceHistory(): Promise<any[]> {
    const keys = await this.storage.keys();
    const attendance = [];
    
    for (const key of keys) {
      const value = await this.storage.get(key);
      attendance.push({ date: key, data: value });
    }

    return attendance;
  }
}
