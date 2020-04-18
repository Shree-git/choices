import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateContactPageRoutingModule } from './agent-create-contact-routing.module';

import { CreateContactPage } from './agent-create-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateContactPageRoutingModule
  ],
  declarations: [CreateContactPage]
})
export class CreateContactPageModule {}
