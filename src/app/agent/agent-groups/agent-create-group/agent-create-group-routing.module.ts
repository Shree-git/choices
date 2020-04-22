import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentCreateGroupPage } from './agent-create-group.page';

const routes: Routes = [
  {
    path: '',
    component: AgentCreateGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentCreateGroupPageRoutingModule {}
