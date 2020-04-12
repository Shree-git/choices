import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
  providedIn: 'root',
  
})
export class FirestoreService {
  currentDate = new Date();
  public collectionRef;
  public ID; userId; user;
  
  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(public firestore: AngularFirestore,  private datePipe: DatePipe, public ngFireAuth: AngularFireAuth,) {
    this.user = this.ngFireAuth.auth.currentUser;
    this.userId = this.user.uid
   }


  createImpulse(
    title: string, date: string, scale: number, description: string, timestamp: string, userUID : string,
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('impulseList/' + id).set({id, title, date, scale, description, timestamp, userUID});
  }

  createEntry(title: string, date: string, day: string, content: string, timestamp: string, userUID : string,
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('currentEntries/'  + id).set({id, title, date, day, content, timestamp, userUID});
  }

  createContact(title: string, content: string, userUID : string,
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc('userContacts/' + id).set({id, title, content, userUID,});
  }





  editEntry(entryId, new_title, new_content){
    return this.firestore.doc('currentEntries/' + entryId).set({title: new_title, content: new_content, date: this.myDate,day: this.day_week, timestamp: this.currentDate.getTime(), userUID : this.userId, 
    }, {merge:true});
  }

  editContact(contactId, new_title, new_content){
    return this.firestore.doc('userContacts/' + contactId).set({yytitle: new_title,content: new_content, userUID : this.userId,
    }, {merge:true});
  }




  getDetail(doc:string, id: string): AngularFirestoreDocument<any>{
    return this.firestore.collection(doc).doc(id);
  }

  getList(doc): AngularFirestoreCollection<any> {
    return this.firestore.collection(doc, ref => ref.where("userUID" ,'==', this.userId));
  }

  getListAll(doc): AngularFirestoreCollection<any> {
    return this.firestore.collection(doc);
  }
  //currently case sensetive  NEEDS TO STAY TITLE
  getSearchedEntries(search : string, collection : string): AngularFirestoreCollection<any> {
    return this.firestore.collection(collection, ref => ref.where("title" ,'>=', search).where("title", "<=", search+"z"));

  }


  delete(doc: string, id: string): Promise<void>{
    return this.firestore.doc('{{doc}}/' + id).delete();
  }


}
