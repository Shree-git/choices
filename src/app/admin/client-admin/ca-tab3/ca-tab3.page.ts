import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../../../models/entry.interface'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-ca-tab3',
  templateUrl: 'ca-tab3.page.html',
  styleUrls: ['ca-tab3.page.scss'],
  providers: [OrderPipe]
})
export class CaTab3Page implements OnInit {
  public impulseList;
  public order3 = 'timestamp';
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
    this.impulseList = this.firestoreService.getList("impulseList", this.userId).valueChanges();
  }
  search(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()){
      this.impulseList = this.firestoreService.getList("impulseList", this.userId).valueChanges();
    }
    else{
      this.impulseList = this.firestoreService.getSearched(val, 'impulseList', 'title', '').valueChanges()
  
    }
       
  }
     //opens and closes drop down menu
     dropMenu() {
      document.getElementById("myDropd").classList.toggle("show");
      //makes it so that clicking anywhere else on the screen closes drop down
      window.onclick = function(e) {
      var ele=<Element>e.target;
          if (!ele.matches('#dropb')){
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
          }
    }
  }
}
