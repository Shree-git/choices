import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaTab3Page} from './ca-tab3.page';
import { OrderModule} from 'ngx-order-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderModule,
    RouterModule.forChild([{ path: '', component: CaTab3Page }])
  ],
  declarations: [CaTab3Page]
})
export class CaTab3PageModule {}
