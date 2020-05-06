import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Impulse } from '../../../models/impulse.interface'
import { AlertController } from '@ionic/angular';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ca-detail',
  templateUrl: './ca-detail.page.html',
  styleUrls: ['./ca-detail.page.scss'],
})
export class CaDetailPage implements OnInit {
  public impulse: Observable<Impulse>;
  public iID;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }
 
  ngOnInit() {
    const impulseId = this.route.snapshot.paramMap.get('id');
    this.iID = impulseId;
    this.impulse = this.fservice.getDetail("impulseList",impulseId).valueChanges();
  }

  back(){
    this._location.back();
  }

  async deleteImpulse(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this impulse?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: ca => {
          console.log('cancel ca');
        },
      },
      {
        text: 'Delete',
        handler: () => {
          this.fservice.delete("impulseList", this.iID);
          this._location.back();
        },
      },
    ],
    });

    (await alert).present();
  }

}
