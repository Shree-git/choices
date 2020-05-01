import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.interface'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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
    public afStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  
  saveUserData(){
    const {photo,email, phone} = this;
    this.authService.updateAccountData(photo, email, phone);
  }

}
