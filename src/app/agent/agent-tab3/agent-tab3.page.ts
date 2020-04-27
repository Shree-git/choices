import { Platform } from '@ionic/angular';

import { Component, ViewChild, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service'
import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-agent-tab3',
  templateUrl: 'agent-tab3.page.html',
  styleUrls: ['agent-tab3.page.scss']
})
export class AgentTab3Page implements OnInit{

  event = { 
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
    public ngFireAuth: AngularFireAuth,
     @Inject(LOCALE_ID)private locale: string
     ) {}

  resetEvent(){
    this.event = {
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
    }}

  ngOnInit() {
    this.resetEvent();
    this.eventList = this.fservice.getYourList("events").snapshotChanges();


/// adds all of user events to calendar
    this.eventList.subscribe( payload => {
      payload.forEach( item => {
        ///checks if event has already been added to calendar
        if(this.eventIDS.indexOf(item.payload.doc.data().eventUID) == -1){

        let eventCopy = {
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
}



//when you click on the event it shows this pop up
        async onEventSelected(event) {
          let start = formatDate(event.startTime, 'medium', this.locale);
          let end = formatDate(event.endTime, 'medium', this.locale);
          const alert = await this.alertCtrl.create({
            header: event.title,
            subHeader: event.desc,
            message: 'From: ' + start + '<br><br>To: ' + end,
            buttons: ['OK']
          });
          alert.present();
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
      this.fservice.createEvent(this.event.title,this.event.desc, start, end, false, null, null,null)
     // this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
      this.resetEvent();
    }

  
///changes the title at the top that tells month and year
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  

 


  


}