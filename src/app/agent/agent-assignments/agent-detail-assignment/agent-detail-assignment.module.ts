import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentDetailAssignmentPageRoutingModule } from './agent-detail-assignment-routing.module';

import { AgentDetailAssignmentPage } from './agent-detail-assignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentDetailAssignmentPageRoutingModule
  ],
  declarations: [AgentDetailAssignmentPage]
})
export class AgentDetailAssignmentPageModule {}
  