import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEntryPageRoutingModule } from './detail-entry-routing.module';

import { DetailEntryPage } from './detail-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEntryPageRoutingModule
  ],
  declarations: [DetailEntryPage]
})
export class DetailEntryPageModule {}
