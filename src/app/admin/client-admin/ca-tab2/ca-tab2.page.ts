import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ca-tab2',
  templateUrl: 'ca-tab2.page.html',
  styleUrls: ['ca-tab2.page.scss'],
  providers: [OrderPipe],
  

})
export class CaTab2Page implements OnInit{
  public userId;


  getClient(): string{
    return this.dataService.clientID
  }

  constructor(
    public firestoreService: FirestoreService,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    private dataService: DataService,

    public router: Router) {}
 
  ngOnInit() {
    this.userId = this.getClient()
    //this.impulseList = this.firestoreService.getList("impulseList", this.userId).valueChanges();
  }
}
