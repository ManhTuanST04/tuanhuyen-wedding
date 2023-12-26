import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreWishService {
  itemCollection: any
  firestore: Firestore

  constructor() {
    this.firestore = inject(Firestore);
    this.itemCollection = collection(this.firestore, 'wish');
  }

  getItems(): Observable<any[]> {
    return collectionData(this.itemCollection);;
  }

  addItem(item: any): Promise<any> {
    return addDoc(this.itemCollection, item);
  }
}
