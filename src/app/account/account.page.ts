import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.interface'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photo: string;
  email: string;
  phone: number;



  constructor(
    public authService: AuthService,
    public router: Router,
    private _location: Location,
    public afStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  cancel(){
    this._location.back();
  }
  
  saveUserData(){
    const {photo,email, phone} = this;
    this.authService.updateAccountData(photo, email, phone);
    this._location.back();

  }

}
