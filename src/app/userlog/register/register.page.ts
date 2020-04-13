import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  fname: string = " "
  lname: string = " "
  email: string = ""
  password: string = ""
  cpassword: string = ""
  pin: string=""
  user_type: string = ""

  constructor(
    public authService: AuthService,
    private router: Router,
    public AlertCtrl: AlertController
    ) { }

  ngOnInit() {
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

  async register(): Promise<void> {
    const { fname, lname, email, password, cpassword, pin } = this;
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }
    
    if(this.pin == '2216'){
      this.user_type = "Admin"
    }
    else if(this.pin == '1173'){
      this.user_type = "Agent"

    }
    else{
      this.user_type = "Client"
    }


    this.authService.registerUser(email,password).then(
      ()=>{
      //  this.authService.sendVerificationMail();

      this.authService.createUser(fname, lname, email, false, this.user_type, "assets/icon/default_icon.png", null)
        this.router.navigateByUrl('/login');
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
