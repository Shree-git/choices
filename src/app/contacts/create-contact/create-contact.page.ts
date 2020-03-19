import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {
  public createContactForm: FormGroup;
 
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public router: Router
    ) {
      this.createContactForm = formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
      })
     }
     ngOnInit() {
    }
  
    async createContact(){
      const loading = await this.loadingCtrl.create();
  
      const title = this.createContactForm.value.title;
      const content = this.createContactForm.value.content;
  
      this.firestoreService.createContact(title, content)
      .then(() => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/src/app/contacts');
        });
      },
        (    error: any) => {
        console.error(error);
      });
      return await loading.present();
    }
  
  }
  