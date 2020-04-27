import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Entry } from '../../models/entry.interface'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-agent-tab1',
  templateUrl: 'agent-tab1.page.html',
  styleUrls: ['agent-tab1.page.scss'],
  providers: [OrderPipe]
})
export class AgentTab1Page implements OnInit {
  public assignmentList;
  public ordering = 'timestamp';
  public user;
  public id;
  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public ngFireAuth: AngularFireAuth,
    public router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.uid
    console.log(this.id)
    this.assignmentList = this.firestoreService.getOnly("assignments", "assignerUID", this.id ).valueChanges();
  }

  
//searches through the list of current entries. If search is left empty after already clicking in
//it just returns all entries so you aren't left with a blank page
//searches title, content, date and day of week up to three letters
search(ev) {
  let val = ev.target.value;
  if(!val || !val.trim()){
    this.assignmentList = this.firestoreService.getYourList("assignments").valueChanges();
  }
  else{
    this.assignmentList = this.firestoreService.getSearched(val, 'assignments', 'title', '').valueChanges()

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