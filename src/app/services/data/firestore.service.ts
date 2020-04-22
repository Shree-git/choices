import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Entry } from '../../models/entry.interface';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root',
  
})
export class FirestoreService {
  currentDate = new Date();
  public collectionRef; public ID; userId; user;
  public db;
  public col: AngularFirestoreCollection<any>;

  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(public firestore: AngularFirestore,  private datePipe: DatePipe, public ngFireAuth: AngularFireAuth,) {
    this.user = this.ngFireAuth.auth.currentUser;
    this.userId = this.user.uid
    this.db = firebase.firestore();
   }



//////////////////// group methods

   createGroup(title: string, date: string
): Promise<void> {
    const id = this.firestore.createId();
    const leader = this.userId
    return this.firestore.doc('groups/' + id).set({id, title, date, leader});
  }





  createImpulse(title: string, date: string,
    scale: number, description: string, timestamp: string, userUID : string,
): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('impulseList/' + id).set({id, title, date, scale, description, timestamp, userUID});
  }


  createEntry( title: string, date: string, day: string, content: string, timestamp: string, userUID : string,
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('currentEntries/'  + id).set({id, title, date, day, content, timestamp, userUID,});
  }

  editEntry(entryId, new_title, new_content){
    return this.firestore.doc('currentEntries/' + entryId).set({title: new_title, content: new_content, date: this.myDate, day: this.day_week, timestamp: this.currentDate.getTime(), userUID : this.userId,
    }, {merge:true});
  }


  createContact(title: string, content: string, userUID : string,
    ): Promise<void> {
      const id = this.firestore.createId();
      return this.firestore.doc('userContacts/' + id).set({id, title, content, userUID,});
    }
  
 editContact(contactId, new_title, new_content){
      return this.firestore.doc('userContacts/' + contactId).set({title: new_title, content: new_content, userUID : this.userId,
      }, {merge:true});
    }


//updates the agent field in of a particular user
updateAgent(id: string, val:string){
  this.db.doc("users/"+id).update({"agentUID" : val})
}  

 //currently case sensetive 
 //set up to search by two values but is currently incapable
 getSearched(search : string, collection : string, condition: string, condition2: string): AngularFirestoreCollection<any> {
  
  return this.firestore.collection(collection, ref => ref.where(condition ,'>=', search).where(condition, "<=", search+"z")
  );}

///gets all documents with field set to a particular condition
getOnly(collection : string, field: string, condition: string): AngularFirestoreCollection<any> {
  return this.firestore.collection(collection, ref => ref.where(field ,'==', condition));

}

///gets all documents with field set to a particular condition
getMy(collection : string, field: string): AngularFirestoreCollection<any> {
  return this.firestore.collection(collection, ref => ref.where(field ,'==', this.userId));

}

//gets the details of a particular document
getDetail(doc:string, id: string): AngularFirestoreDocument<any>{
  return this.firestore.collection(doc).doc(id);
}

//gets all of ONE user's documents
getList(doc, useriiD): AngularFirestoreCollection<any> {
  return this.firestore.collection(doc, ref => ref.where("userUID" ,'==', useriiD));
}

//gets all of ONE LOGGED IN user's documents
getYourList(doc): AngularFirestoreCollection<any> {
  return this.firestore.collection(doc, ref => ref.where("userUID" ,'==', this.userId));
}

//returns ALL documents in that collection
getListAll(doc): AngularFirestoreCollection<any> {
  return this.firestore.collection(doc);
}
//deletes document with corresponding ID
delete(doc: string, id: string): Promise<void>{
  return this.firestore.doc(doc + '/' + id).delete();
}
 
}
