import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { CalendarModule } from 'ion2-calendar';
import {NgCalendarModule } from 'ionic2-calendar';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    CalendarModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
