import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Impulse } from '../../../models/impulse.interface'
import { AlertController } from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public impulse: Observable<Impulse>;
  public iID;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _location: Location,

    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }
  back(){
    this._location.back();
  }
  

  ngOnInit() {
    const impulseId = this.route.snapshot.paramMap.get('id');
    this.iID = impulseId;
    this.impulse = this.fservice.getDetail("impulseList",impulseId).valueChanges();
  }
}
