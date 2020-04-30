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
  
  public assignment: Observable<Assignment>;
  public currentUsers;
  public currentGroups;
  public iID;
  public test;

  setAssignment(ag : string){
    this.dataService.assignment = ag;
  }
  getAssignment(){
   return this.dataService.assignment;
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

    this.currentUsers = this.fservice.getMy("users", "agentUID").valueChanges();
    this.currentGroups = this.fservice.getMy("groups", "leader").valueChanges();
    const assignmentId = this.route.snapshot.paramMap.get('id');
    this.iID = assignmentId;
    this.setAssignment(this.iID)
    this.assignment = this.fservice.getDetail("assignments", assignmentId).valueChanges();
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
    


//THIS DEFINETLY DOES NOT WORK MY DUDE
    this.fservice.editAssignment(assignmentid, new_title, new_content, new_date, assigned_to);


    this.showEdit();
    this.router.navigateByUrl('agent-tabs/agent-tab1');



  }

  getEmail(){
    let id = (<HTMLInputElement>document.getElementById("email")).className;  
    console.log(id)
    this.firestore.collection('users', ref => ref.where('userUID' ,'==', id)).valueChanges().subscribe((User: any) => {
      this.test = User[0].firstName + " " + User[0].lastName;
     // (<HTMLInputElement>document.getElementById("email")).innerHTML = arr;
      console.log(this.test)
      return this.test;
  })}
  
 
}
