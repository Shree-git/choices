import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Contact } from '../../../models/contact.interface'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
  providers: [OrderPipe]
})
export class ContactsPage implements OnInit {
  public userContacts;
  public ordering = 'title';
  user;

  everybody;
  constructor(public callNumber: CallNumber, public contacts: Contacts,public firestoreService: FirestoreService,private orderPipe: OrderPipe, public router: Router) {
    this.everybody = this.contacts.find(["*"]);
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userContacts = this.firestoreService.getList("userContacts", this.user.userUID).valueChanges();
  }
//searches through the list of current entries. If search is left empty after already clicking in
//it just returns all entries so you aren't left with a blank page
//searches title, content, date and day of week up to three letters
search(ev) {
  let val = ev.target.value;
  if(!val || !val.trim()){
    this.userContacts = this.firestoreService.getList("userContacts", this.user.userUID).valueChanges();
  }
  else{
    this.userContacts = this.firestoreService.getSearched(val, 'userContacts', 'title', '').valueChanges()

  }
     
}
callContact(number: string) {
  this.callNumber.callNumber(number, true)
    .then(() => console.log('Dialer Launched!' + number))
    .catch(() => console.log('Error launching dialer' + number));
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
