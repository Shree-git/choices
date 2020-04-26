import { Component, ViewChild, OnInit, LOCALE_ID, Inject} from '@angular/core';

import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

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

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string) {}

  resetEvent(){
    this.event = {
      title: '',
  desc: '',
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  allDay: false
  
 
 
    }
  }

  ngOnInit() {
    this.resetEvent();
        }

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
   
  
   

    

    onTimeSelected(ev) {

      let selected = new Date(ev.selectedTime); 
      this.event.startTime = selected.toISOString();
      selected.setHours(selected.getHours()+1);
      this.event.endTime= (selected.toISOString())
;
    }

    addEvent() {
   

      let eventCopy = {
        title: this.event.title, 
        desc: this.event.desc,
        startTime: new Date(this.event.startTime),
        endTime: new Date(this.event.endTime)
      }
   
      this.eventSource.push(eventCopy);
      this.myCal.loadEvents();
      this.resetEvent();
    }

    

  
  
   
  

  

  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  

 


  


}
