import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaDetailPageRoutingModule } from './ca-detail-routing.module';

import { CaDetailPage } from './ca-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaDetailPageRoutingModule
  ],
  declarations: [CaDetailPage]
})
export class CaDetailPageModule {}
