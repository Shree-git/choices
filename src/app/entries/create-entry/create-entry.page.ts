import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../services/data/firestore.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.page.html',
  styleUrls: ['./create-entry.page.scss'],
})
export class CreateEntryPage implements OnInit {
  public createEntryForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public router: Router
    ) {
      this.createEntryForm = formBuilder.group({
        title: ['', Validators.required],
        date: ['', Validators.required],
        day: ['', Validators.required],
        content: ['', Validators.required]
      })
     }

  ngOnInit() {
  }

  async createEntry(){
    const loading = await this.loadingCtrl.create();

    const title = this.createEntryForm.value.title;
    const date = this.createEntryForm.value.date;
    const day = this.createEntryForm.value.day;
    const content = this.createEntryForm.value.content;

    this.firestoreService.createEntry(title, date, day, content)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/tabs/tab1');
      });
    },
    error => {
      console.error(error);
    });
    return await loading.present();
  }
}
