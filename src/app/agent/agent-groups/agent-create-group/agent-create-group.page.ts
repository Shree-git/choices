import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Contact } from '../../../models/contact.interface'
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-agent-create-group',
  templateUrl: './agent-create-group.page.html',
  styleUrls: ['./agent-create-group.page.scss'],
})
export class AgentCreateGroupPage implements OnInit {
  public createGroupForm: FormGroup;
  currentDate = new Date();
  user;
  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public callNumber: CallNumber, public contacts: Contacts,
    public firestoreService: FirestoreService,
    private datePipe: DatePipe,
    formBuilder: FormBuilder,
    public router: Router,
    public ngFireAuth: AngularFireAuth
    ) {
      this.createGroupForm = formBuilder.group({
        title: ['', [Validators.maxLength(50), Validators.required]],
        date: this.myDate,
      })
      this.user = this.ngFireAuth.auth.currentUser;

     }

  ngOnInit() {

    //this.userContacts = this.firestoreService.getuserContacts().valueChanges();
  }

  async createGroup(){
    const loading = await this.loadingCtrl.create();

    const title = this.createGroupForm.value.title;
    const date = this.myDate


    this.firestoreService.createGroup(title, date)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('agent-tabs/agent-tab2');
        
      });
      //let cont= this.firestoreService.getSafeContact();
      //console.log(this.cont.content)
     // this.callContact(this.cont.content)
    },
    error => {
      console.error(error);
    });
    return await loading.present();

  }
}
