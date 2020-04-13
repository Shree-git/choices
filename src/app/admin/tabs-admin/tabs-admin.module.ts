import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsAdminPageRoutingModule } from './tabs-admin-routing.module';

import { TabsAdminPage } from './tabs-admin.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsAdminPageRoutingModule
  ],
  declarations: [TabsAdminPage]
})
export class TabsAdminPageModule {}
