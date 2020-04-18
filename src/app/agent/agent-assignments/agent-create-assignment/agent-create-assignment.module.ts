import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEntryPageRoutingModule } from './agent-create-assignment-routing.module';

import { CreateEntryPage } from './agent-create-assignment.page';

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
