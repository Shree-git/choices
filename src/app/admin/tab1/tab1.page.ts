import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../../models/entry.interface'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import {Location} from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [OrderPipe]
})
export class Tab1Page implements OnInit {
  public currentEntries;
  public ordering = 'timestamp';
  reverse = false;

  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    private _location: Location,

    public router: Router) {}
user
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));    
    this.currentEntries = this.firestoreService.getListAll("assignments").valueChanges();
  }
  
  back(){
    this._location.back();
  }
  



  
//searches through the list of current entries. If search is left empty after already clicking in
//it just returns all entries so you aren't left with a blank page
//searches title, content, date and day of week up to three letters
search(ev) {
  let val = ev.target.value;
  if(!val || !val.trim()){
    this.currentEntries = this.firestoreService.getListAll("assignments").valueChanges();
  }
  else{
    this.currentEntries = this.firestoreService.getSearched(val, 'assignments', 'title', '').valueChanges()

  }
     
}

   //opens and closes drop down menu
   dropMenu() {
    document.getElementById("myDrop").classList.toggle("show");
    //makes it so that clicking anywhere else on the screen closes drop down
    window.onclick = function(e) {
    var ele=<Element>e.target;
        if (!ele.matches('#drop')){
          var dropdowns = document.getElementsByClassName("dropdown-cont");
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