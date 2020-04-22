import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailAgentPage } from './user-detail-agent.page';

const routes: Routes = [
  {
    path: '',
    component: UserDetailAgentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailAgentPageRoutingModule {}
