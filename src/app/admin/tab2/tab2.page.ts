import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import { UserDetailPage } from './user-detail/user-detail.page';
import { DataService } from 'src/app/services/data.service';
//'../tab2/user-detail/user-detail.page.ts'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [OrderPipe]

})
export class Tab2Page implements OnInit{
  currentUsers;
  type = "all";
  order2 = 'lastName';
  pairing: any;

  getClient(): string{
    return this.dataService.clientID
  }
  
  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public route: ActivatedRoute,
    private dataService: DataService,

    public router: Router) {}
 
  ngOnInit() {
    if(this.type == "all"){
    this.currentUsers = this.firestoreService.getListAll("users").valueChanges();
    }
    else{
      this.currentUsers = this.firestoreService.getOnly("users", "userType", this.type).valueChanges();
    }
  }
  search(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()){
      this.currentUsers = this.firestoreService.getListAll("users").valueChanges();
    }
    else{
      this.currentUsers = this.firestoreService.getSearched(val, 'users', "lastName", "firstName").valueChanges();
    }
       
  }
  setType(typ: string){
    this.type = typ;
    this.ngOnInit()
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
