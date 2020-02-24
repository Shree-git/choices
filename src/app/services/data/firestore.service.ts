import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Impulse } from '../../models/impulse.interface'
import { Entry } from '../../models/entry.interface'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createImpulse(
    title: string,
    date: string,
    scale: number,
    description: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc('impulseList/' + id).set({
      id,
      title,
      date,
      scale,
      description
    });
  }

  createEntry(
    title: string,
    date: string,
    day: string,
    content: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc('currentEntries/' + id).set({
      id,
      title,
      date,
      day,
      content
    });
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
