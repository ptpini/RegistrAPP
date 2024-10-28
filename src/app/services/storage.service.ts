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

  async getAllAttendances(): Promise<any[]> {
    const attendances = await this.storage.get('attendances') || [];
    return attendances;
  }

  async saveAttendance(content: string, isSynced = false) {
    const currentAttendance = { content, date: new Date(), isSynced };
    const attendances = await this.getAllAttendances();
    attendances.push(currentAttendance);
    await this.storage.set('attendances', attendances);
  }

  async updateAttendanceStatus(content: string) {
    const attendances = await this.getAllAttendances();
    const index = attendances.findIndex(att => att.content === content);
    if (index > -1) {
      attendances[index].isSynced = true;
      await this.storage.set('attendances', attendances);
    }
  }
}
