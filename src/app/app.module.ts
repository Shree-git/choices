import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import firebaseConfig from './firebase'
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';



import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';


firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
   // CallNumber,
    Contacts,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
