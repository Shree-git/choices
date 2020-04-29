import { Platform } from '@ionic/angular';

import { Component, ViewChild, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service'
import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})
export class Tab3Page  implements OnInit{

  event = { 
    eventUID: '',
    assignerUID: '',
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
  public userList;
  public groupEvents;
  public userAssignments;
  public groupAssignments;

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

  getGroup(): string{
    return this.dataService.group
  }
  setGroup(val: string){
    this.dataService.group = val
  }

  constructor(
    private alertCtrl: AlertController,
    public fservice: FirestoreService,
    public ngFireAuth: AngularFireAuth,
    private dataService: DataService,
     @Inject(LOCALE_ID)private locale: string
     ) {}

  resetEvent(){
    this.event = {
    eventUID: '',
    assignerUID: '',
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
    }}


  ngOnInit() {
    this.resetEvent();
    this.eventList = this.fservice.getYourList("events").snapshotChanges();
    this.userList =this.fservice.getYourList("users").snapshotChanges();
   


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
          if(event.assignerUID == null || event.assignerUID == undefined ){
                      console.log("Delete successful!")
                      this.fservice.delete('events', event.eventUID)
                      this.myCal.loadEvents();
                      this.resetEvent();
    
          }
          else{
            this.alert("Delete Failed!", "You are unauthorized to delete this event!")
          }
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
      this.fservice.createEvent(this.event.title,this.event.desc, start, end, false,null, null, null)
      this.myCal.loadEvents();
      this.resetEvent();
    }

///changes the title at the top that tells month and year
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  

 


  


}