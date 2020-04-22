import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentCreateGroupPageRoutingModule } from './agent-create-group-routing.module';

import { AgentCreateGroupPage } from './agent-create-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgentCreateGroupPageRoutingModule
  ],
  declarations: [AgentCreateGroupPage]
})
export class AgentCreateGroupPageModule {}
