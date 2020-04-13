import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CaTabsPageRoutingModule } from './ca-tabs-routing.module';

import { CaTabsPage } from './ca-tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CaTabsPageRoutingModule
  ],
  declarations: [CaTabsPage]
})
export class CaTabsPageModule {}
