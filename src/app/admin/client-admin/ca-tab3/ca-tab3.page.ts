import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-ca-tab3',
  templateUrl: 'ca-tab3.page.html',
  styleUrls: ['ca-tab3.page.scss']
})
export class CaTab3Page {


  optionsSingle: CalendarComponentOptions = {
    color: 'danger'
  };

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    color: 'danger'
  };

  // Multi Select
  dateMulti: string[];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    color: 'danger'
  };
  constructor( public platform: Platform) {}
  onChange($event) {
    console.log($event);
  }

}
