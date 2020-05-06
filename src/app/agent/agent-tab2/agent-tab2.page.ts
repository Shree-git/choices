import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';
import {DataService} from '../../services/data.service'


@Component({
  selector: 'app-agent-tab2',
  templateUrl: 'agent-tab2.page.html',
  styleUrls: ['agent-tab2.page.scss'],
  providers: [OrderPipe]
})

export class AgentTab2Page implements OnInit{
  public currentUsers;
  public currentGroups;
  new_members = new Array<string>()


  getGroup(): string{
    return this.dataService.group
  }

  getRegular(): boolean{
    return this.dataService.regular
  }

  setRegular(av){
    this.dataService.regular = av
  }

  
  constructor(
    public fservice: FirestoreService,
    private dataService: DataService,
    private orderPipe: OrderPipe,
    public router: Router) {}
 
  ngOnInit() {
    this.currentUsers = this.fservice.getMy("users", "agentUID").valueChanges();
    this.currentGroups = this.fservice.getMy("groups", "leader").valueChanges();
  }

 
showCheck(iid, check){
      check = !check;
      if(check == true){
      this.fservice.updateCheck(iid, check)
         this.new_members.push(iid)
      }
      else{
        this.fservice.updateCheck(iid, check)
        let indx = this.new_members.indexOf(iid, 0)
        this.new_members.splice(indx, 1); 
      }}


  addMembers(){
    const groupno = this.getGroup()
    for(let i = 0; i< this.new_members.length; i++){
      this.fservice.updateGroup(this.new_members[i], groupno)
      this.fservice.updateCheck(this.new_members[i], false)
    }
    this.setRegular(true)
    console.log("Completed adding to group", this.getRegular())
    this.router.navigateByUrl('agent-tabs/agent-tab2');
  }


  search(ev) {
    let val = ev.target.value;
    if(!val || !val.trim()){
      this.currentUsers = this.fservice.getMy("users", "agentUID").valueChanges();
      this.currentGroups = this.fservice.getMy("groups", "leader").valueChanges();
       }
    else{
      this.currentUsers = this.fservice.getSearched(val, 'users', "lastName", "firstName").valueChanges();
      this.currentGroups = "";

     // this.currentGroups = this.fservice.getMy("groups", "leader").valueChanges();

    }}


     //opens and closes drop down menu
     dropMenu() {
      document.getElementById("myDro").classList.toggle("show");
      //makes it so that clicking anywhere else on the screen closes drop down
      window.onclick = function(e) {
      var ele=<Element>e.target;
          if (!ele.matches('#drobtns')){
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }}}}}

}
