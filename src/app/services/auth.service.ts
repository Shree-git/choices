import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from "../models/user.interface";
import { UserAccount } from "../models/user_account.interface"
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
        this.SetUserData(user);
        this.userData = user;
        this.accountData = this.afStore.doc('userAccount/' + this.userData.uid).valueChanges();
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
      console.log(result.user);
      console.log(this.userData);
    }).catch((error) => {
      window.alert(error);
    })
  }

  SetUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  setAccountData(user){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`userAccount/${user.uid}`);
    const userData: UserAccount = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      birthdate: user.birthdate
    }
    return userRef.set(userData, {
      merge: true
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

  updateEmail(photo){
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
    return this.userData.uid;
  }

  logOutUser(): Promise<void> {
    return this.ngFireAuth.auth.signOut().then(()=>{
      console.log("Logout successful");
      localStorage.removeItem('user');
      this.router.navigateByUrl('/register');
    });
  }
}
