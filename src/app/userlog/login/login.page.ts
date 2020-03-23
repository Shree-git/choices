import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import 'firebase/app'
import 'firebase/auth'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login(): Promise<void> {
    const { email, password } = this;
    
    this.authService.loginUser(email,password).then(
      ()=>{


        //only allows pass if email is verified
        ///if(this.authService.isEmailVerified) {
          /* } else {
          window.alert('Email is not verified');
          return false;
        }*/
          this.router.navigateByUrl('/tabs/tab2');
          this.authService.setLocalPersist();
      },
      async error => {
        const alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text:'Ok', role:'cancel'}]
        });
        (await alert).present();
      }
    );
  }
}
