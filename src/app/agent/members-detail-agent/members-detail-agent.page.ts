import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Group } from '../../models/group.interface'
import { AlertController } from '@ionic/angular';
import {DataService} from '../../services/data.service'
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-agent-detail-members',
  templateUrl: './members-detail-agent.html',
  styleUrls: ['./members-detail-agent.scss'],
  providers: [OrderPipe]

})
export class AgentDetailMembersPage implements OnInit {
  public group: Observable<Group>;
  public groupId;
  public assignments;
  public groupMembers;
  public user: any;
  public iID;
  public arry = [];
  ord = 'lastName';

  public results = [];
  public userMembers;


  setAssignment(ag : string){
    this.dataService.assignment = ag;
  }
  setGroup(ag : string){
    this.dataService.group = ag;
  }
  getGroup(){
    return this.dataService.group;
  }
  getAssignment(){
    return this.dataService.assignment;
  }



  setRegular(av){
    this.dataService.regular = av
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private orderPipe: OrderPipe,
    public alertController: AlertController,
    public fservice: FirestoreService,
    private dataService: DataService

  ) { }

  ngOnInit() {
    const groupI = this.getGroup();
    const assign = this.getAssignment();
    console.log(assign)
    this.groupId = groupI
    ///so need to get user ids of assignment ids
    //then if user id exists in users set groupMembers
    //otherwise if user id exists in group ids
    //get group id and get the users in that group


    //if getting the assignment user then
    if(assign != null && assign != undefined && assign !=""){
      ///get assignment and save user info
      this.assignments = this.fservice.getOnly("assignments", "assignmentUID", assign ).snapshotChanges()
      this.group = this.fservice.getDetail("assignments",assign).valueChanges();
      this.assignments.subscribe(payload =>{
        payload.forEach(item =>{
          let assigns = {
            assignmentUID: item.payload.doc.data().assignmentUID,

            userUID: item.payload.doc.data().userUID,

            title: item.payload.doc.data().title,

          }
          this.arry.push(assigns)
          
        })
        
      this.userMembers = this.fservice.getOnly("users", "userUID", this.arry[0].userUID).snapshotChanges()
      this.groupMembers = this.fservice.getOnly("users", "groupUID", this.arry[0].userUID).snapshotChanges()    
      this.userMembers.subscribe(payload =>{
        payload.forEach(item =>{
          let data = {
            userUID: item.payload.doc.data().userUID,
            firstName: item.payload.doc.data().firstName,
            lastName: item.payload.doc.data().lastName,
            userType: item.payload.doc.data().userType,
            photoURL: item.payload.doc.data().photoURL,
          }
          this.results.push(data)
        })
      })
      this.groupMembers.subscribe(payload =>{
        payload.forEach(item =>{
          let data = {
            userUID: item.payload.doc.data().userUID,
            firstName: item.payload.doc.data().firstName,
            lastName: item.payload.doc.data().lastName,
            userType: item.payload.doc.data().userType,
            photoURL: item.payload.doc.data().photoURL,
          }
          this.results.push(data)
        })
      })
      })

      
     
    }
    ///if just getting the group members then do this
    else{
      this.groupMembers = this.fservice.getOnly("users", "groupUID", this.groupId).valueChanges()
      this.group = this.fservice.getDetail("groups",this.groupId).valueChanges();
      this.groupMembers.subscribe(payload =>{
        payload.forEach(item =>{
          let data = {
            userUID: item.payload.doc.data().userUID,
            firstName: item.payload.doc.data().firstName,
            lastName: item.payload.doc.data().lastName,
            userType: item.payload.doc.data().userType,
            photoURL:  "assets/icon/default_icon.png",

          }
          this.results.push(data)
        })
      })

    }

  }
resetValues(){
  this.setGroup("")
  this.setAssignment("")
}

  search(ev) {
    let search = ev.target.value;
    if(!search || !search.trim()){
      this.groupMembers = this.fservice.getOnly("users", "groupUID", this.groupId).valueChanges()
    }
    else{
      this.groupMembers = this.fservice.getSpecificSearched(this.groupId, search, 'users', "lastName", "firstName").valueChanges();
    }
       
  }
  //opens and closes drop down menu
  dropMenu() {
    document.getElementById("myDropdow").classList.toggle("show");
    //makes it so that clicking anywhere else on the screen closes drop down
    window.onclick = function(e) {
    var ele=<Element>e.target;
        if (!ele.matches('#dropbt')){
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
              }
          }
        }
  }
}

}
