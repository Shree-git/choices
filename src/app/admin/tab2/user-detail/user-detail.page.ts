import { Component, OnInit, ɵConsole, Output, Input } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router, PreloadingStrategy } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';
import {DataService} from '../../../services/data.service'



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  public user: any;
  public iID;
  public array = [];
  db = firebase.firestore();


  getClient(): string{
    return this.dataService.clientID
  }
  getAgent(): string{
    return this.dataService.agentID
  }


  setAgent(ag: string){
    this.dataService.agentID = ag;
  }

  setPairing(val: boolean){
    this.dataService.pairing = val;
  }


  setClient(ag : string){
    this.dataService.clientID = ag;
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public fservice: FirestoreService,
    public auth: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.iID = userId
    this.user = this.fservice.getDetail("users", userId).valueChanges();
    //var user = firebase.auth().currentUser;


    ///Makes it so the data service sets to agent if the details are for agent so we can pair them with a user and vice versa
    let self = this;
    var documentReference = this.db.collection('users').doc(this.iID);
    documentReference.get().then(function(documentSnapshot) {
                              if (documentSnapshot.exists) {
                                  console.log(documentSnapshot.data().userType == "Agent")
                                if(documentSnapshot.data().userType == "Agent"){
                                self.setAgent(documentSnapshot.data().userUID)
                                }
                                else if(documentSnapshot.data().userType == "Client"){
                                  self.setClient(documentSnapshot.data().userUID)

                                }}
                                else {
                                console.log('document not found');
                              }
                        })
    console.log("THIS IS OUR CLIENT" + this.getClient())
    console.log("THIS IS OUR AGENT" + this.getAgent())


  }

  Pair(){
    //var user = firebase.auth().currentUser;
    let self = this;
    var documentReference = this.db.collection('users').doc(this.iID);
    documentReference.get().then(function(documentSnapshot) {
                              if (documentSnapshot.exists) {


                                ///this is soley pairing from the user side
                                if(documentSnapshot.data().agentUID !== null || documentSnapshot.data().agentUID !== undefined){
                                self.setAgent(documentSnapshot.data().agentUID)
                                self.setPairing(false)
                                self.router.navigateByUrl("/user-detail/" + self.getAgent()) 
                                }
                                else{
                                  self.createPair()
                                }
                              } else {
                                console.log('document not found');
                              }
                        })

                      }


  createPair(){
    this.router.navigateByUrl("/tab2"); 
    this.setPairing(true)
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
