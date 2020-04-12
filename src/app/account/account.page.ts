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
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;



  constructor(
    public authService: AuthService,
    public router: Router,
    public afStore: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  /*
  saveUserData(){
    const {firstName,lastName, phoneNumber, birthDate} = this;
    const user: User = {
      userUID: this.authService.userData.userUID,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      birthdate: this.birthDate,
    }
    //this.authService.setAccountData(user);
    this.location.back(); // <-- go back to previous location on cancel
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  */
}
