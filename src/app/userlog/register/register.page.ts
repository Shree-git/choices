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
  email: string = ""
  password: string = ""
  cpassword: string = ""
  pin: string=""
  isAdmin = false;
  isAgent = false;

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
    const { email, password, cpassword, pin } = this;
    ///temporary pin inputed
    if(pin === "2216"){
      this.isAdmin = true;
      this.authService.setIsAdmin(this.isAdmin)
      console.log("pins match!!")
    }

    //temporary pin for agent
    else if(pin === "1129"){
      this.isAgent = true;
      this.authService.setIsAgent(this.isAgent)
      console.log("pins match!!")
    }
    if(password !== cpassword){
      return console.error("Passwords don't match")
    }
   



    this.authService.registerUser(email,password).then(
      ()=>{
      //  this.authService.sendVerificationMail();

        ////
       // this.authService.makeAdmin(this.user, this.isAdmin);
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
