import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  saveUserData(){
    const {firstName,lastName,displayName,email} = this;

    this.authService.updateDisplayName(displayName);
    this.router.navigateByUrl('/tabs/tab2');
  }

}
