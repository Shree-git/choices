import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaTab3Page } from './ca-tab3.page';
import { CalendarModule } from 'ion2-calendar';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CaTab3Page }]),
    CalendarModule
  ],
  declarations: [CaTab3Page]
})
export class CaTab3PageModule {}
