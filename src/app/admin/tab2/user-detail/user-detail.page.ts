import { Component, OnInit, ɵConsole } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router, PreloadingStrategy } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from '../../../models/user.interface'
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { createSecurePair } from 'tls';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';




@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  public user: any;
  public iID;
  public array = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.iID = userId
    this.user = this.fservice.getDetail("users", userId).valueChanges();
    
   // console.log(this.agent)
  }

  routeToClient(){
    this.router.navigateByUrl('/ca-tabs/'+ this.iID);
  }
  

  Pair(){
    var db = firebase.firestore();
    //var user = firebase.auth().currentUser;
    let self = this;
    var documentReference = db.collection('users').doc(this.iID);
    documentReference.get().then(function(documentSnapshot) {
                              if (documentSnapshot.exists) {
                              self.router.navigateByUrl("/user-detail/" + documentSnapshot.data().agentUID) 
                              } else {
                                console.log('document not found');
                              }
                        })

                      }


  createPair(){
    console.log("Whoops!")
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
