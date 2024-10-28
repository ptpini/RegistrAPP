import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Network } from '@ionic-native/network/ngx';

import { ApiService } from './services/api.service';
import { AttendanceService } from './services/attendance.service';
import { NetworkService } from './services/network.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // Incluye HttpClientModule
    IonicStorageModule.forRoot() // Inicializa Ionic Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network, // Proveedor de Network para detectar conexión
    ApiService, 
    AttendanceService,
    NetworkService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
