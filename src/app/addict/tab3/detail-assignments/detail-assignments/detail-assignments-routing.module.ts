import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAssignmentsPage } from './detail-assignments.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAssignmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAssignmentsPageRoutingModule {}
