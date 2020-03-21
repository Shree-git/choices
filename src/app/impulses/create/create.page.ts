import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Contact } from '../../models/contact.interface'

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createImpulseForm: FormGroup;
  currentDate = new Date();

  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public callNumber: CallNumber, public contacts: Contacts,
    public firestoreService: FirestoreService,
    private datePipe: DatePipe,
    formBuilder: FormBuilder,
    public router: Router
    ) {
      this.createImpulseForm = formBuilder.group({
        title: ['', [Validators.maxLength(50), Validators.required]],
        date: this.myDate,
        scale: ['', [Validators.min(1), Validators.max(10), Validators.required]],
        description: ['', Validators.required],
        timestamp : this.currentDate.getTime(),
      })
     }

  ngOnInit() {
    //this.userContacts = this.firestoreService.getuserContacts().valueChanges();
  }

  async createImpulse(){
    const loading = await this.loadingCtrl.create();

    const title = this.createImpulseForm.value.title;
    const date = new Date().toString();
    const scale = this.createImpulseForm.value.scale;
    const description = this.createImpulseForm.value.description;
    const timestamp = this.createImpulseForm.value.timestamp;

    this.firestoreService.createImpulse(title, date, scale, description, timestamp)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/tabs/tab2');
        
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
