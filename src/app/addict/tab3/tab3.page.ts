import { Platform } from '@ionic/angular';

import { Component, ViewChild, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service'
import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})
export class Tab3Page  implements OnInit{

  event = { 
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  
  };

  minDate = new Date().toISOString();

                                           eventSource = [];

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
    this.eventList = this.fservice.getYourList("events").valueChanges();
  /*
    this. eventSource = Object.keys(this.eventList).map(event => {
      return {title: event, desc: event, startTime: event, endTime: event} 
  });
  */
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
      let eventCopy = {
        title: this.event.title, 
        desc: this.event.desc,
        startTime: new Date(this.event.startTime),
        endTime: new Date(this.event.endTime)
      }
   
      this.fservice.createEvent(this.event.title,this.event.desc, new Date(this.event.startTime), new Date(this.event.endTime), false, null, null)

      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
      this.resetEvent();
    }

  

  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  

 


  


}