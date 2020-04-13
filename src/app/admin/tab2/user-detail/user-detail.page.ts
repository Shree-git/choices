import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from '../../../models/user.interface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  public user: Observable<User>;
  public iID;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = this.fservice.getDetail("users", userId).valueChanges();
  }

  async deleteUser(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this user?',
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
          this.fservice.delete("users", this.iID);
          this.router.navigateByUrl('tabs/tab1');
        },
      },
    ],
    });

    (await alert).present();
  }


  

}
