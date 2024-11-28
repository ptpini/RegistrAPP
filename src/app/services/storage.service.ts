import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageInstance: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageInstance.create();
  }

  async saveAttendance(content: string): Promise<void> {
    const attendances = (await this.storage?.get('attendances')) || [];
    attendances.push({ content, isSynced: false });
    await this.storage?.set('attendances', attendances);
  }

  async getAllAttendances(): Promise<any[]> {
    return (await this.storage?.get('attendances')) || [];
  }

  async updateAttendanceStatus(content: string): Promise<void> {
    const attendances = (await this.storage?.get('attendances')) || [];
    const index = attendances.findIndex((record: any) => record.content === content);
    if (index !== -1) {
      attendances[index].isSynced = true;
      await this.storage?.set('attendances', attendances);
    }
  }
}
