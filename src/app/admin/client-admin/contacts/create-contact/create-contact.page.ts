import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../../../services/data/firestore.service'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.page.html',
  styleUrls: ['./create-contact.page.scss'],
})
export class CreateContactPage implements OnInit {
  public createContactForm: FormGroup;
  user;
 
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public ngFireAuth: AngularFireAuth,
    public router: Router
    ) {
      this.createContactForm = formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
      })
      this.user = this.ngFireAuth.auth.currentUser;

     }
     ngOnInit() {
    }
  
    async createContact(){
      const loading = await this.loadingCtrl.create();
  
      const title = this.createContactForm.value.title;
      const content = this.createContactForm.value.content;
      const uid = this.user.userUID

      this.firestoreService.createContact(title, content, uid)
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
  