import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAssignmentsPageRoutingModule } from './detail-assignments-routing.module';

import { DetailAssignmentsPage } from './detail-assignments.page';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAssignmentsPageRoutingModule
  ],
  declarations: [DetailAssignmentsPage]
})
export class DetailAssignmentsPageModule {}
