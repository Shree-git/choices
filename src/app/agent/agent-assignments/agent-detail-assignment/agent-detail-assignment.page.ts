import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/data/firestore.service'
import { AngularFirestore} from '@angular/fire/firestore'

import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Assignment } from '../../../models/assignment.interface'
import { AlertController } from '@ionic/angular';
import {DataService} from '../../../services/data.service'
 
@Component({
  selector: 'app-agent-detail-assignment',
  templateUrl: './agent-detail-assignment.html', 
  styleUrls: ['./agent-detail-assignment.scss'],
})
export class AgentDetailAssignmentPage implements OnInit {
  
  public assignment;
  public currentUsers;
  public currentGroups;
  public iID;
  public test;
  public minDate = new Date()
  assignID;

  setAssignment(ag : string){
    this.dataService.assignment = ag;
  }

  setAdmin(ag : boolean){
    this.dataService.adminUse = ag;
  }
 
  getAssignment(){
   return this.dataService.assignment;
  }
  getAdmin(): boolean{
    return this.dataService.adminUse
  }
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public firestore: AngularFirestore,
    private dataService: DataService,
    public alertController: AlertController,
    public fservice: FirestoreService
  ) { }

  ngOnInit() {
    const admin = this.getAdmin()
    this.assignID = this.route.snapshot.paramMap.get('id');
    this.iID = this.assignID;
    this.setAssignment(this.iID)
    this.assignment = this.fservice.getDetail("assignments", this.iID).valueChanges();


    if(admin == true){
      this.currentUsers = this.fservice.getOnly("users", "userType", "Client").valueChanges();
      this.currentGroups = this.fservice.getListAll("groups").valueChanges();
  }
    else{
      this.currentUsers = this.fservice.getMy("users", "agentUID").valueChanges();
      this.currentGroups = this.fservice.getMy("groups", "leader").valueChanges();

    }
   
   // this.test = this.fservice.getUserID(this.iID)
    
    //this.test = this.fservice.getUse()
    //console.log(this.test)
  }

  edit = false;
  showEdit(){
    this.edit = !this.edit;
  }
  async deleteAssignment(){
    const alert = this.alertController.create({
      message: 'Are you sure you want to delete this Assignment?',
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
          this.fservice.delete("assignments",this.iID);
          this.fservice.deleteBridge("events", "assignmentUID", this.iID)
          this.router.navigateByUrl('agent-tabs/agent-tab1');
        },
      },
    ],
    });
    (await alert).present();
  }


  ////////////////////////////FIX EDIT ASSIGNMENT IT IS NOT READY
  editAssignment(){
    let assignmentid = this.route.snapshot.paramMap.get('id');
    let new_title = (<HTMLInputElement>document.getElementById("edited-title")).value;
    let new_content = (<HTMLInputElement>document.getElementById("edited-content")).value;   
    let assigned_to = (<HTMLInputElement>document.getElementById("assign")).value;
    let new_date = (<HTMLInputElement>document.getElementById("new_date")).value;  
    this.fservice.editAssignment(assignmentid, new_title, new_content, new_date, assigned_to);
    this.fservice.editEventAssignment(assignmentid, new_title, new_content, new_date, assigned_to)
    this.showEdit();
    this.router.navigateByUrl('agent-tabs/agent-tab1');
    this.setAdmin(false);
  }
 
}
