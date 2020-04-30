import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AgentCreateAssignmentPage } from './agent-create-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: AgentCreateAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentCreateAssignmentPageRoutingModule {}
