import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/firestore'
import { Impulse } from '../../models/impulse.interface';
import { Contact } from '../../models/contact.interface';
import { Entry } from '../../models/entry.interface';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
  
})
export class FirestoreService {
  currentDate = new Date();4
  public collectionRef;
  public ID;
  
  myDate : any = this.datePipe.transform(this.currentDate, 'short');
  day_week  : any = this.datePipe.transform(this.currentDate, 'EEE');

  constructor(public firestore: AngularFirestore,  private datePipe: DatePipe,) { }

  createImpulse(
    title: string,
    date: string,
    scale: number,
    description: string,
    timestamp: string,

  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc('impulseList/' + id).set({
      id,
      title,
      date,
      scale,
      description,
      timestamp
    });
  }

  createEntry(
    title: string,
    date: string,
    day: string,
    content: string,
    timestamp: string,
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc('currentEntries/' + id).set({
      id,
      title,
      date,
      day,
      content,
      timestamp
    });
  }

  editEntry(entryId, new_title, new_content){
    return this.firestore.doc('currentEntries/' + entryId).set({
      title: new_title,
      content: new_content,
      date: this.myDate,
      day: this.day_week,
      timestamp: this.currentDate.getTime(),
      
    }, {merge:true});
  }

  getImpulseList(): AngularFirestoreCollection<Impulse> {
    return this.firestore.collection('impulseList');
  }

  getImpulseDetail(impulseId: string): AngularFirestoreDocument<Impulse>{
    return this.firestore.collection('impulseList').doc(impulseId);
  }

  deleteImpulse(impulseId: string): Promise<void>{
    return this.firestore.doc('impulseList/' + impulseId).delete();
  }


  getCurrentEntries(): AngularFirestoreCollection<Entry> {
    return this.firestore.collection('currentEntries');
  }

  //currently case sensetive  NEEDS TO STAY TITLE
  getSearchedEntries(search : string, collection : string): AngularFirestoreCollection<Entry> {
    return this.firestore.collection(collection, ref => ref.where("title" ,'>=', search).where("title", "<=", search+"z"));

  }
 
  getEntryDetail(entryId: string): AngularFirestoreDocument<Entry>{
    return this.firestore.collection('currentEntries').doc(entryId);
  }

  deleteEntry(entryId: string): Promise<void>{
    return this.firestore.doc('currentEntries/' + entryId).delete();
  }


  
  createContact(
    title: string,
    content: string,
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc('userContacts/' + id).set({
      id,
      title,
      content,
    });
  }

  editContact(contactId, new_title, new_content){
    return this.firestore.doc('userContacts/' + contactId).set({
      title: new_title,
      content: new_content,
    }, {merge:true});
  }
  getuserContacts(): AngularFirestoreCollection<Contact> {
    console.log(this.firestore.collection('userContacts'))

    return this.firestore.collection('userContacts');

  }
  getContactDetail(contactId: string): AngularFirestoreDocument<Contact>{
    return this.firestore.collection('userContacts').doc(contactId);
  }
  deleteContact(contactId: string): Promise<void>{
    return this.firestore.doc('userContacts/' + contactId).delete();
  }
}
