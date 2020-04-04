import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewContactPage } from './view-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ViewContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewContactPageRoutingModule {}
