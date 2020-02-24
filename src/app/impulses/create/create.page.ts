import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../services/data/firestore.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createImpulseForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public router: Router
    ) {
      this.createImpulseForm = formBuilder.group({
        title: ['', [Validators.maxLength(50), Validators.required]],
        scale: ['', [Validators.min(1), Validators.max(10), Validators.required]],
        description: ['', Validators.required]
      })
     }

  ngOnInit() {
  }

  async createImpulse(){
    const loading = await this.loadingCtrl.create();

    const title = this.createImpulseForm.value.title;
    const date = new Date().toString();
    const scale = this.createImpulseForm.value.scale;
    const description = this.createImpulseForm.value.description;

    this.firestoreService.createImpulse(title, date, scale, description)
    .then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/tabs/tab2');
      });
    },
    error => {
      console.error(error);
    });
    return await loading.present();
  }
}
