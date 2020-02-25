import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserAccount } from '../models/user_account.interface'
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
  displayName: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;



  constructor(
    public authService: AuthService,
    public router: Router,
    public afStore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  saveUserData(){
    const {firstName,lastName,displayName, phoneNumber, birthDate, email} = this;
    const user: UserAccount = {
      uid: this.authService.userData.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      birthdate: this.birthDate
    }
    this.authService.setAccountData(user);
    this.authService.updateDisplayName(displayName);
    this.router.navigateByUrl('/tabs/tab2');
  }

}
