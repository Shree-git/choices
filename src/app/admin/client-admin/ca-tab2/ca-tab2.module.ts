import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaTab2Page } from './ca-tab2.page';
import { OrderModule} from 'ngx-order-pipe';
import {NgCalendarModule } from 'ionic2-calendar';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: '', component: CaTab2Page }])
  ],
  declarations: [CaTab2Page]
})
export class CaTab2PageModule {}
