import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../models/entry.interface'
import { FirestoreService } from '../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public currentEntries;
  constructor(
    public firestoreService: FirestoreService,
    public router: Router) {}

  ngOnInit() {
    this.currentEntries = this.firestoreService.getCurrentEntries().valueChanges();
  }
}