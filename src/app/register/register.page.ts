import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public authService: AuthService,
    private router: Router,
    public AlertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async register(): Promise<void> {
    const { email, password, cpassword } = this;
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }
    // try {
    // const res = await this.authService.auth.createUserWithEmailAndPassword(email,password).then(
    //     ()=>{
    //     this.router.navigateByUrl('/tabs/tab2');
    //   }
    //   );
    // } catch (error) {
    //   console.dir(error)
    // }
    this.authService.registerUser(email,password).then(
      ()=>{
        this.router.navigateByUrl('/tabs/tab2');
      },
      async error => {
        const alert = this.AlertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role:'cancel'}]
        });
        (await alert).present();
      }
    );
  }
}
