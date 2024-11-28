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

  // Inicializa el almacenamiento
  async init() {
    const storage = await this.storageInstance.create();
    this.storage = storage;
  }

  // Método para obtener un valor específico desde el almacenamiento
  async get(key: string): Promise<any> {
    if (!this.storage) {
      await this.init();
    }
    return this.storage?.get(key);
  }

  // Método para guardar un valor específico en el almacenamiento
  async set(key: string, value: any): Promise<void> {
    if (!this.storage) {
      await this.init();
    }
    await this.storage?.set(key, value);
  }

  // Método para guardar asistencia localmente
  async saveAttendance(content: string): Promise<void> {
    const attendances = (await this.get('attendances')) || [];
    attendances.push({ content, isSynced: false });
    await this.set('attendances', attendances);
  }

  // Método para obtener todas las asistencias almacenadas localmente
  async getAllAttendances(): Promise<any[]> {
    return (await this.get('attendances')) || [];
  }

  // Método para actualizar el estado de sincronización de una asistencia
  async updateAttendanceStatus(content: string): Promise<void> {
    const attendances = (await this.get('attendances')) || [];
    const index = attendances.findIndex(
      (record: any) => record.content === content
    );
    if (index !== -1) {
      attendances[index].isSynced = true;
      await this.set('attendances', attendances);
    }
  }

  // Método para eliminar un valor específico del almacenamiento
  async remove(key: string): Promise<void> {
    if (!this.storage) {
      await this.init();
    }
    await this.storage?.remove(key);
  }
}
