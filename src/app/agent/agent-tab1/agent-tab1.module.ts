import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentTab1Page } from './agent-tab1.page';
import { OrderModule} from 'ngx-order-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderModule,
    RouterModule.forChild([{ path: '', component: AgentTab1Page }])
  ],
  declarations: [AgentTab1Page]
})
export class AgentTab1PageModule {}
 