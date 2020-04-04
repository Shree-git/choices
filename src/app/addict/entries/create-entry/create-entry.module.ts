import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEntryPageRoutingModule } from './create-entry-routing.module';

import { CreateEntryPage } from './create-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateEntryPageRoutingModule
  ],
  declarations: [CreateEntryPage]
})
export class CreateEntryPageModule {}
