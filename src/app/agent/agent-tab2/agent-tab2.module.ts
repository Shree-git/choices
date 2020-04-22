import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentTab2Page } from './agent-tab2.page';
import { OrderModule} from 'ngx-order-pipe';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderModule,
    RouterModule.forChild([{ path: '', component: AgentTab2Page }])
  ],
  declarations: [AgentTab2Page]
})
export class AgentTab2PageModule {}
