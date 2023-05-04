import { Injectable } from '@angular/core';

import { Opinion } from '../models/opinion';
import { Product } from '../models/product';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpinionService {
  private collection: CollectionReference<DocumentData>;
  constructor(private readonly firestore: Firestore) {
    this.collection = collection(firestore, 'products');
  }

  getOpinions(product: Product) {
    const ref = doc(this.collection, product.id!!);
    const opinions = collection(ref, 'opinions');
    return collectionData(opinions, { idField: 'id' }) as Observable<Opinion[]>;
  }

  addOpinion(opinion: Opinion, product: Product) {
    const ref = doc(this.collection, product.id!!);
    const opinions = collection(ref, 'opinions');
    console.log(opinions.path);
    return addDoc(opinions, opinion);
  }

  deleteOpinion(id: string, product: Product) {
    const ref = doc(this.collection, product.id!!);
    const opinions = collection(ref, 'opinions');
    return deleteDoc(doc(opinions, id));
  }

  updateOpinion(opinion: Opinion, product: Product) {
    const ref = doc(this.collection, product.id!!);
    const opinions = collection(ref, 'opinions');
    return updateDoc(doc(opinions, opinion.id), { ...opinion });
  }
}
