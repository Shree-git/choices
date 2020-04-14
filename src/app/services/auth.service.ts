import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from "../models/user.interface";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  accountData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.auth.onAuthStateChanged(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

  setLocalPersist(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {

    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);

  }


  registerUser(
    email: string,
    password: string
  ): Promise<any> {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then(()=>{
    });
  }

  sendVerificationMail(){
    return this.ngFireAuth.auth.currentUser.sendEmailVerification().then(()=>{
      this.router.navigate(['verify-email']);
    })
  }

  resetPassword(email: string): Promise<void> {
    return this.ngFireAuth.auth.sendPasswordResetEmail(email).then(()=>{
      window.alert('Check your email to reset your password!')
      this.router.navigateByUrl('/login')
    }).catch((error) => {
      window.alert(error);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  // && user.emailVerified !== false

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  /*
  GoogleAuth(){
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider){
    return this.ngFireAuth.auth.signInWithPopup(provider).then((result) =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/tabs/tab2');
      })
      this.SetUserData(result.user);
      console.log(result.user);
      console.log(this.userData);
    }).catch((error) => {
      window.alert(error);
    })
  }
  */

  createUser(
    firstName: string, lastName: string,  email: string,
    emailVerified: boolean, userType: string,
    photoURL: string, phoneNumber: string, agentUID:string
  ): Promise<void> {
    var user = firebase.auth().currentUser;
    var userUID = user.uid;
    return this.afStore.doc('users/' + userUID).set({userUID, firstName, lastName, email, emailVerified, userType, photoURL, phoneNumber, agentUID});
  }
  

//data the admin can edit of the clients
assignAgent(agent){
  return this.afStore.doc('users/' + this.userData.uid).set({
    userUID: this.userData.uid,
    firstName: this.userData.firstName,
    lastName:this.userData.lastName,
    email: this.userData.email,
    emailVerified: this.userData.emailVerified,
    userType: this.userData.userType,
    photoURL: this.userData.photoURL,
    phoneNumber: this.userData.phoneNumber,
    agentUID: agent
  }, {merge:true});
}

  //Data the users can edit of themselves
  editUserData(first, last, email_A, photo, number){
    return this.afStore.doc('users/' + this.userData.uid).set({
      userUID: this.userData.uid,
      firstName: first,
      lastName: last,
      email: email_A,
      emailVerified: this.userData.emailVerified,
      userType: this.userData.userType,
      photoURL: photo,
      phoneNumber: number,
    }, {merge:true});
  }
  
  //confusing
  updatePhoto(photo){
    var user = this.ngFireAuth.auth.currentUser;
    user.updateProfile({
      photoURL: photo
    }).then(()=>{
      this.userData.photoURL = user.photoURL;
    }).catch(err =>{
      window.alert(err);
    })
  }

  getUserEmail(){
    return this.userData.email;
  }

  getUserId(){
   // console.log(this.userData.uid)
    return this.userData.uid;
  }

  getUserType(){
    console.log(this.userData.userType)
    return this.userData.userType;
  }

  logOutUser(): Promise<void> {
    return this.ngFireAuth.auth.signOut().then(()=>{
      console.log("Logout successful");
      localStorage.removeItem('user');
      this.router.navigateByUrl('/register');
    });
  }
}
