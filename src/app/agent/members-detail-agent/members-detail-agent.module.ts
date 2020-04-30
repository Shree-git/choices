import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderModule} from 'ngx-order-pipe';
import { IonicModule } from '@ionic/angular';

import { AgentDetailMembersPageRoutingModule } from './members-detail-agent-routing.module';

import { AgentDetailMembersPage } from './members-detail-agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderModule,
    AgentDetailMembersPageRoutingModule
  ],
  declarations: [AgentDetailMembersPage]
})
export class AgentDetailMembersPageModule {}
