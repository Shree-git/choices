import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../models/entry.interface'
import { FirestoreService } from '../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [OrderPipe]
})
export class Tab1Page implements OnInit {
  public currentEntries;
  public order = 'timestamp';

  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public router: Router) {}

  ngOnInit() {
    this.currentEntries = this.firestoreService.getCurrentEntries().valueChanges();
  }

  
//searches through the list of current entries. If search is left empty after already clicking in
//it just returns all entries so you aren't left with a blank page
//searches title, content, date and day of week up to three letters
search(ev) {
  let val = ev.target.value;
  if (!val || !val.trim()) {
    this.currentEntries =  this.currentEntries.query();
  }
  this.currentEntries = this.currentEntries.query({
    title: val, content: val, date: val, day: val});
    
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