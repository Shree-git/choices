import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Impulse } from '../../../../models/impulse.interface'
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const impulseId = this.route.snapshot.paramMap.get('id');
    this.iID = impulseId;
    this.impulse = this.fservice.getDetail("impulseList",impulseId).valueChanges();
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
          this.router.navigateByUrl('tabs/tab2');
        },
      },
    ],
    });

    (await alert).present();
  }

}
