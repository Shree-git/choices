import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Impulse } from '../models/impulse.interface'
import { FirestoreService } from '../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public impulseList;
  constructor(
    public firestoreService: FirestoreService,
    public router: Router) {}

  ngOnInit() {
    this.impulseList = this.firestoreService.getImpulseList().valueChanges();
  }
}
