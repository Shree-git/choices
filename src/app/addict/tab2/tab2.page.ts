import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [OrderPipe]

})
export class Tab2Page implements OnInit{
  public impulseList;
  public order = 'timestamp';
  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public router: Router) {}
 
  ngOnInit() {
    this.impulseList = this.firestoreService.getYourList("impulseList").valueChanges();
  }
  search(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()){
      this.impulseList = this.firestoreService.getYourList("impulseList").valueChanges();
    }
    else{
      this.impulseList = this.firestoreService.getSearched(val, 'impulseList', 'title', '').valueChanges()
  
    }
       
  }
     //opens and closes drop down menu
     dropMenu() {
      document.getElementById("myDropdown").classList.toggle("show");
      //makes it so that clicking anywhere else on the screen closes drop down
      window.onclick = function(e) {
      var ele=<Element>e.target;
          if (!ele.matches('#dropbtn')){
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
