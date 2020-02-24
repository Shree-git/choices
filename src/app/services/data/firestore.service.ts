import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Impulse } from '../../models/impulse.interface';
import { Entry } from '../../models/entry.interface';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root',
  
})
export class FirestoreService {
  currentDate = new Date();
  
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

  getEntryDetail(entryId: string): AngularFirestoreDocument<Entry>{
    return this.firestore.collection('currentEntries').doc(entryId);
  }

  deleteEntry(entryId: string): Promise<void>{
    return this.firestore.doc('currentEntries/' + entryId).delete();
  }
}
