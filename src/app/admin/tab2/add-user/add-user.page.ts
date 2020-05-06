import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular'
import { FirestoreService } from '../../../services/data/firestore.service'
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  public inviteUserForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public router: Router,
    private _location: Location,

    ) {
      this.inviteUserForm = formBuilder.group({
        email: ['', [Validators.maxLength(50), Validators.required]],
      })

     }

  ngOnInit() {

  }

  async inviteUser(){
    const email = this.inviteUserForm.value.email;
       this.back();
  }
  
  back(){
    this._location.back();
  }

}
