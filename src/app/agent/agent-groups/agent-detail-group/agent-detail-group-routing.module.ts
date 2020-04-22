import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentDetailGroupPage } from './agent-detail-group.page';

const routes: Routes = [
  {
    path: '',
    component: AgentDetailGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDetailGroupPageRoutingModule {}
