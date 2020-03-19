import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEntryPage } from './detail-entry.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEntryPageRoutingModule {}
