import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Group } from '../../../models/group.interface'
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import {DataService} from '../../../services/data.service'

@Component({
  selector: 'app-agent-detail-group',
  templateUrl: './agent-detail-group.page.html',
  styleUrls: ['./agent-detail-group.page.scss'],
})
export class AgentDetailGroupPage implements OnInit {
  public group: Observable<Group>;
  public groupId;


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
  getPairing(): boolean{
    return this.dataService.pairing
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
    private dataService: DataService

  ) { }

  ngOnInit() {
    const groupI = this.route.snapshot.paramMap.get('id');
    this.groupId = groupI;
    this.group = this.fservice.getDetail("groups",this.groupId).valueChanges();





  }

  addMembers(){
    if(this.getPairing() == true){ //checks if pairing is on. if it is then set agent field in user data
      this.fservice.updateAgent(this.getClient(), this.getAgent())
      console.log("Pairing Complete!") //this.PairComplete()
      this.router.navigateByUrl("/tabs-admin");
    }else{
    let self = this;
    var documentReference = this.db.collection('users').doc(this.iID);
    documentReference.get().then(function(documentSnapshot) {
                              if (documentSnapshot.exists) {
                                ///this is soley pairing from the user side
                                let type = documentSnapshot.data().userType
                                ///if the user type is Client if statements
                                if(type == "Client"){
                                let agent = documentSnapshot.data().agentUID
                                //client does not have an agent so route to list of all users and create a pair of client and agent
                                if(agent == undefined || agent == null){
                                  self.setPairing(true)
                                  self.router.navigateByUrl("/tab2-agent"); 
                                }else{//client does have an agent so view that agent's information
                                  self.setAgent(agent)
                                  self.setPairing(false)
                                  self.router.navigateByUrl("/user-detail/" + self.getAgent()) 
                                }}
                                //if the user type is Agent if statements
                                //goes directly to setting a pairing
                              else if(type == "Agent"){
                                self.setAgent(documentSnapshot.data().userUID)
                                self.setPairing(true)
                                self.router.navigateByUrl("/tab2-admin")
                              }}
                              else {
                                console.log('document not found');
                              }})}}

  async deleteGroup(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this Group?',
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
          this.fservice.delete("groups", this.groupId);
          this.router.navigateByUrl('agent-tabs/agent-tab2');
        },
      },
    ],
    });

    (await alert).present();
  }

}
