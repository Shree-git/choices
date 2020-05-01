import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentCreateAssignmentPageRoutingModule } from './agent-create-assignment-routing.module';

import { AgentCreateAssignmentPage } from './agent-create-assignment.page';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgentCreateAssignmentPageRoutingModule
  ],
  declarations: [AgentCreateAssignmentPage]
})
export class AgentCreateAssignmentPageModule {}
 