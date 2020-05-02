import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../../services/data/firestore.service' 
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.page.html',
  styleUrls: ['./create-entry.page.scss'],
  providers: [DatePipe],
})
export class CreateEntryPage implements OnInit {
  public createEntryForm: FormGroup;
  currentDate = new Date();
  user;
  
  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private datePipe: DatePipe,
    formBuilder: FormBuilder,
    public router: Router,
    public ngFireAuth: AngularFireAuth,

    ) {
      this.createEntryForm = formBuilder.group({
        title: ['', Validators.required],
        date: this.myDate,
        day: this.day_week,
        content: ['', Validators.required],
        timestamp : this.currentDate.getTime(),
      })
      this.user = this.ngFireAuth.currentUser;
     }

  ngOnInit() {

  }

  async createEntry(){
    const loading = await this.loadingCtrl.create();

    const title = this.createEntryForm.value.title;
    const date = this.createEntryForm.value.date;
    const day = this.createEntryForm.value.day;
    const content = this.createEntryForm.value.content;
    const timestamp = this.createEntryForm.value.timestamp;
    const uid = this.user.uid

    

    this.firestoreService.createEntry(title, date, day, content, timestamp, uid)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/tabs/tab1');
      });
    },
      (    error: any) => {
      console.error(error);
    });
    return await loading.present();
  }

}
