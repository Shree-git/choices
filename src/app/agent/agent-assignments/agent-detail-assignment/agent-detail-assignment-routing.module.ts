import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentDetailAssignmentPage } from './agent-detail-assignment.page';
 
const routes: Routes = [
  {
    path: '',
    component: AgentDetailAssignmentPage
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDetailAssignmentPageRoutingModule {}
 