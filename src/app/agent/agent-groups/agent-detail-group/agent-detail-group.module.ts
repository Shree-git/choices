import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentDetailGroupPageRoutingModule } from './agent-detail-group-routing.module';

import { AgentDetailGroupPage } from './agent-detail-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentDetailGroupPageRoutingModule
  ],
  declarations: [AgentDetailGroupPage]
})
export class AgentDetailGroupPageModule {}
