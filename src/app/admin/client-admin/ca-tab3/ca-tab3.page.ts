import { Platform } from '@ionic/angular';
import { Component, ViewChild, OnInit} from '@angular/core';
import { Observable } from 'rxjs'
import { FirestoreService } from '../../../services/data/firestore.service'
import { CalendarComponent} from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
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
export class CaTab3Page implements OnInit{
  assignments
  userId
  reverse = false;
  public order3 = 'dueTime';
  getClient(): string{
    return this.dataService.clientID
  }

  setAdmin(val: boolean){
    this.dataService.adminUse = val
  }

  constructor(
    private alertCtrl: AlertController,
    public fservice: FirestoreService,
    public route: ActivatedRoute,
    private orderPipe: OrderPipe,
    private dataService: DataService,
    public router: Router,

    ) {}


  ngOnInit() {
    console.log("From Ca 3" ,this.getClient())
    this.userId = this.getClient()
    this.assignments = this.fservice.getList("assignments", this.userId).valueChanges();
   
  }

  search(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()){
      this.assignments = this.fservice.getList("assignments", this.userId).valueChanges();
    }
    else{
      this.assignments = this.fservice.getSpecificSearched(this.userId,"userUID", val, 'assignments', 'title').valueChanges();
  
    }
       
  }

  editAssignment(assignId){
    this.setAdmin(true)
    this.router.navigateByUrl("/agent-detail-assignment/" + assignId)
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


