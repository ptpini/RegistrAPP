import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';  // Asegúrate de incluir este módulo

import { ApiService } from './services/api.service';  // Asegúrate de que el servicio está importado
import { StorageService } from './services/storage.service';  // Asegúrate de que el servicio está importado

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,   // Incluye HttpClientModule
    IonicStorageModule.forRoot()  // Inicializa Ionic Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,  // Agrega el servicio a los providers
    StorageService  // Agrega el servicio a los providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
