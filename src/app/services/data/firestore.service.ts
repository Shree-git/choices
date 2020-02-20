import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Impulse } from '../../models/impulse.interface'

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

  getImpulseList(): AngularFirestoreCollection<Impulse> {
    return this.firestore.collection('impulseList');
  }

  getImpulseDetail(impulseId: string): AngularFirestoreDocument<Impulse>{
    return this.firestore.collection('impulseList').doc(impulseId);
  }

  deleteImpulse(impulseId: string): Promise<void>{
    return this.firestore.doc('impulseList/' + impulseId).delete();
  }
}
