import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collection: CollectionReference<DocumentData>;
  constructor(private readonly firestore: Firestore) {
    this.collection = collection(firestore, 'products');
  }

  getProducts() {
    return collectionData(
      query(this.collection, where('deleted', '!=', true)),
      { idField: 'id' }
    ) as Observable<Product[]>;
  }

  getProduct(sku: string) {
    return collectionData(
      query(
        this.collection,
        where('sku', '==', sku),
        where('deleted', '!=', true)
      ),
      {
        idField: 'id',
      }
    ) as Observable<Product[]>;
  }

  addProduct(product: Product) {
    return addDoc(this.collection, product);
  }

  updateProduct(product: Product) {
    return updateDoc(doc(this.collection, product.id!!), { ...product });
  }

  async deleteProduct(id: string) {
    return updateDoc(doc(this.collection, id), { deleted: true });
  }
}
