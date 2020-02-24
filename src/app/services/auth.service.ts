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
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
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
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  GoogleAuth(){
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider){
    return this.ngFireAuth.auth.signInWithPopup(provider).then((result) =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/tabs/tab2');
      })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    })
  }

  SetUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  updateDisplayName(dName){
    var user = this.ngFireAuth.auth.currentUser;
    user.updateProfile({
      displayName: dName
    }).then(()=>{
      this.userData.displayName = user.displayName;
    }).catch(err =>{
      window.alert(err);
    })
  }

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


  logOutUser(): Promise<void> {
    return this.ngFireAuth.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    });
  }
}
