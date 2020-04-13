import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaTab1Page} from './ca-tab1.page';
import { OrderModule} from 'ngx-order-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderModule,
    RouterModule.forChild([{ path: '', component: CaTab1Page }])
  ],
  declarations: [CaTab1Page]
})
export class CaTab1PageModule {}
