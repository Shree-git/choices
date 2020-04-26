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



////////////Assignment methods///////////////

createAssignment( assignerUID: string, userUID: string, eventUID: string, title: string, desc: string, dueTime: string, done: boolean, user_response: string): Promise<void> {
  const assignmentUID = this.firestore.createId();
  return this.firestore.doc('assignments/'  + assignmentUID).set({assignmentUID,assignerUID, userUID, eventUID, title, desc, dueTime, done, user_response});
}

 /* EDIT ASSIGNMENT */
/////////////////////////////////////////////////////////////////////////////////////////////////






////////////Event methods///////////////

   createEvent( title: string, desc: string, startTime: Date, endTime: Date, done: boolean, assignerUID: string, notifTime: string): Promise<void> {
    const eventUID = this.firestore.createId();
    const userUID = this.userId;
    return this.firestore.doc('events/'  + eventUID).set({eventUID, title, desc, startTime, endTime, userUID, done, assignerUID, notifTime});
  }

   /* EDIT EVENT */
/////////////////////////////////////////////////////////////////////////////////////////////////






////////////Group methods///////////////

   createGroup(title: string, date: string): Promise<void> {
    const id = this.firestore.createId();
    const leader = this.userId
    return this.firestore.doc('groups/' + id).set({id, title, date, leader});
  }

//updates check field in user (check field says if user is being added to group or not)
  updateCheck(id: string, val:boolean){
    this.db.doc("users/"+id).update({"check" : val})
  }  
  

//updates group field of given user   id: user id, val: groupid
  updateGroup(id: string, val:string){
    this.db.doc("users/"+id).update({"groupUID" : val})
  }  
  //////////////////////////////////////////////////////////////////////////////////////////////






//////////Impulse Methods////////////

  createImpulse(title: string, date: string,
    scale: number, description: string, timestamp: string, userUID : string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('impulseList/' + id).set({id, title, date, scale, description, timestamp, userUID});
  }
////////////////////////////////////////////////////////////////////////////////////////////////






//////////Entry Methods////////////

  createEntry( title: string, date: string, day: string, content: string, timestamp: string, userUID : string,): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('currentEntries/'  + id).set({id, title, date, day, content, timestamp, userUID,});
  }

  editEntry(entryId, new_title, new_content){
    return this.firestore.doc('currentEntries/' + entryId).set({title: new_title, content: new_content, date: this.myDate, day: this.day_week, timestamp: this.currentDate.getTime(), userUID : this.userId,
    }, {merge:true});
  }
////////////////////////////////////////////////////////////////////////////////////////////////






//////////Contact Methods////////////  

  createContact(title: string, content: string, userUID : string,): Promise<void> {
      const id = this.firestore.createId();
      return this.firestore.doc('userContacts/' + id).set({id, title, content, userUID,});
    }
  
 editContact(contactId, new_title, new_content){
      return this.firestore.doc('userContacts/' + contactId).set({title: new_title, content: new_content, userUID : this.userId,
      }, {merge:true});
    }
/////////////////////////////////////////////////////////////////////////////////////////////////







///////////General Collection Methods/////////////


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

///gets all user's data of a particular collection
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

//gets all of THE ONE LOGGED IN user's documents
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
/////////////////////////////////////////////////////////////////////////////////////////////////



 
}
