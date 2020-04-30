import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentDetailMembersPage } from './members-detail-agent.page';

const routes: Routes = [
  {
    path: '',
    component: AgentDetailMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDetailMembersPageRoutingModule {}
