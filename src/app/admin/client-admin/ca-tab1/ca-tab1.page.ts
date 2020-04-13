import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../../../models/entry.interface'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-ca-tab1',
  templateUrl: 'ca-tab1.page.html',
  styleUrls: ['ca-tab1.page.scss'],
  providers: [OrderPipe]
})
export class CaTab1Page implements OnInit {
  public impulseList;
  public order3 = 'timestamp';
  public userId;
  constructor(
    public firestoreService: FirestoreService,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    public router: Router) {}
 
  ngOnInit() {
    var useri = (this.router.url).split('/');
    this.userId = useri[2]
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
