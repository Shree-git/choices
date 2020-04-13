import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Impulse } from '../../../models/impulse.interface'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-ca-tab2',
  templateUrl: 'ca-tab2.page.html',
  styleUrls: ['ca-tab2.page.scss'],
  providers: [OrderPipe],
  

})
export class CaTab2Page implements OnInit{
  public userId;
  constructor(
    public firestoreService: FirestoreService,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    public router: Router) {}
 
  ngOnInit() {
    var useri = (this.router.url).split('/');
    this.userId = useri[2]
    //this.impulseList = this.firestoreService.getList("impulseList", this.userId).valueChanges();
  }
}
