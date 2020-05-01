import { Component, ViewChild, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { Observable } from 'rxjs'
import { FirestoreService } from '../../../services/data/firestore.service'
import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ca-tab2',
  templateUrl: 'ca-tab2.page.html',
  styleUrls: ['ca-tab2.page.scss'],
  providers: [OrderPipe],
  

})
export class CaTab2Page implements OnInit{
  public userId;
  public assignID;
  userAssignments;
  userList;
  user;
  groupEvents;
  groupAssignments;

  getClient(): string{
    return this.dataService.clientID
  }

  getGroup(): string{
    return this.dataService.group
  }

  setGroup(val: string){
    this.dataService.group = val
  }
  event = { 
    eventUID: '',
    assignerUID: '',
    assignmentUID:'',
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  
  };

  minDate = new Date().toISOString();

  eventSource = [];
  private eventIDS = [];
  
  calendar = {
    mode: 'month',
    currentDate:new Date()
  }
  
  viewTitle= '';
  public eventList;
  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    public fservice: FirestoreService,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    private dataService: DataService,
    public router: Router,

    @Inject(LOCALE_ID)private locale: string) {}

 
    
  resetEvent(){
    this.event = {
    eventUID: '',
    assignerUID:'',
    assignmentUID:'',
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
    }}
  
    ngOnInit() {
      this.resetEvent();
      this.user = JSON.parse(localStorage.getItem('user'));
      this.assignID = this.user.uid
      console.log("Current admin id", this.assignID)
      console.log("From Ca tabs" ,this.getClient())
      this.eventList = this.fservice.getOnly("events", "userUID", this.getClient()).snapshotChanges();
      this.userList =this.fservice.getOnly("users", "userUID", this.getClient()).snapshotChanges();
     
  
  
      ///adds group events to individual's calendar
      this.userList.subscribe( payload => {
        payload.forEach( item => {
            this.setGroup(item.payload.doc.data().groupUID)
          })
          this.groupEvents = this.fservice.getOnly("events", "userUID", this.getGroup()).snapshotChanges()
          this.groupAssignments = this.fservice.getOnly("assignments", "userUID",this.getGroup() ).valueChanges()
          this.groupEvents.subscribe( payload => {
            payload.forEach( item => {
              ///checks if event has already been added to calendar
              if(this.eventIDS.indexOf(item.payload.doc.data().eventUID) == -1){
      
              let eventCopy = {
                eventUID: item.payload.doc.data().eventUID, 
                assignerUID: item.payload.doc.data().assignerUID, 
                assignmentUID: item.payload.doc.data().assignmentID,
                title: item.payload.doc.data().title,
                desc: item.payload.doc.data().desc,
                startTime:new Date(item.payload.doc.data().startTime),
                endTime: new Date(item.payload.doc.data().endTime),
                allDay: false
              }
              this.eventIDS.push(item.payload.doc.data().eventUID)
              this.eventSource.push(eventCopy);
      
              }})  
              this.myCal.loadEvents();
              this.resetEvent();
          })
        })
  
  /// adds all of users individual events to calendar
      this.eventList.subscribe( payload => {
        payload.forEach( item => {
          ///checks if event has already been added to calendar
          if(this.eventIDS.indexOf(item.payload.doc.data().eventUID) == -1){
  
          let eventCopy = {
            eventUID: item.payload.doc.data().eventUID, 
            assignerUID: item.payload.doc.data().assignerUID, 
            assignmentUID: item.payload.doc.data().assignmentID,
            title: item.payload.doc.data().title,
            desc: item.payload.doc.data().desc,
            startTime:new Date(item.payload.doc.data().startTime),
            endTime: new Date(item.payload.doc.data().endTime),
            allDay: false
          }
          this.eventIDS.push(item.payload.doc.data().eventUID)
           this.eventSource.push(eventCopy);
  
          }})  
          this.myCal.loadEvents();
          this.resetEvent();
      })
  
    
     
  this.userAssignments = this.fservice.getYourList("assignments").valueChanges()
  
  } // end of ng on init
  
  
 
//when you click on the event it shows this pop up
async onEventSelected(event) {
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: [
      {
        text: 'Delete',
        role: 'delete',
        cssClass: 'secondary',
        handler: () => {

          this.deleteEvent(event)
        }
      }, {
        text: 'OK',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });
  alert.present();
}

async alertAssignment(event) {
  const alert = await this.alertCtrl.create({
    header: "Delete Assignment?",
    message: "Would you like to delete the assignment associated with this event?",
    buttons: [
      {
        text: 'No',
        role: 'delete',
        cssClass: 'secondary',
        handler: () => {
            console.log("Alright!")
        }
      }, {
        text: 'Yes',
        role: 'delete',
        cssClass: 'secondary',
        handler: () => {

          this.deleteAssignment(event)
        }
      }
    ]
  });
  alert.present();
}



async alert(head, mess) {
  const alert = await this.alertCtrl.create({
    header: head,
    message: mess,
    buttons: ['OK'],
  });

  await alert.present();
  let result = await alert.onDidDismiss();
}

deleteEvent(event){
  if(event.assignerUID == null || event.assignerUID == undefined){
              console.log("Delete successful!")
              this.fservice.delete('events', event.eventUID)
              this.myCal.loadEvents();
              this.resetEvent();
  }
  else{
    this.alertAssignment(event)
  }
}
  
deleteAssignment(event){
  console.log("Delete successful!")
  this.fservice.delete('events', event.eventUID)
  this.fservice.delete('assignments', event.assignmentUID)
}

//sets time data for adding new event (???)        
onTimeSelected(ev) {
let selected = new Date(ev.selectedTime); 
this.event.startTime = selected.toISOString();
selected.setHours(selected.getHours()+1);
this.event.endTime= (selected.toISOString());
}


addEvent() {
let start = this.event.startTime
let end = this.event.endTime
this.fservice.createAssignmentAdmin(this.assignID, this.getClient(), this.event.title,this.event.desc, start, end, false, null)
// this.eventSource.push(eventCopy);
this.myCal.loadEvents();
this.resetEvent();
}


///changes the title at the top that tells month and year
onViewTitleChanged(title){
this.viewTitle = title;
}

}
