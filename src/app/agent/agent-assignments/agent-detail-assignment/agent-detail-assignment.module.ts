import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEntryPageRoutingModule } from './agent-detail-assignment-routing.module';

import { DetailEntryPage } from './agent-detail-assignment.page';

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
