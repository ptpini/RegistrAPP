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

  // Guardar un valor en el almacenamiento
  set(key: string, value: any) {
    return this.storage.set(key, value);
  }

  // Recuperar un valor desde el almacenamiento
  get(key: string) {
    return this.storage.get(key);
  }

  // Eliminar un valor del almacenamiento
  remove(key: string) {
    return this.storage.remove(key);
  }
}
