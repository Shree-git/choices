import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Impulse } from '../../models/impulse.interface'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-agent-tab2',
  templateUrl: 'agent-tab2.page.html',
  styleUrls: ['agent-tab2.page.scss'],
  providers: [OrderPipe]

})
export class AgentTab2Page implements OnInit{
  public currentUsers;
  public currentGroups;
  //public order = 'lastName';




  constructor(
    public firestoreService: FirestoreService,
    private orderPipe: OrderPipe,
    public router: Router) {}
 
  ngOnInit() {
    this.currentUsers = this.firestoreService.getMy("users", "agentUID").valueChanges();
    this.currentGroups = this.firestoreService.getMy("groups", "leader").valueChanges();

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
     //opens and closes drop down menu
     dropMenu() {
      document.getElementById("myDro").classList.toggle("show");
      //makes it so that clicking anywhere else on the screen closes drop down
      window.onclick = function(e) {
      var ele=<Element>e.target;
          if (!ele.matches('#drobtn')){
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
