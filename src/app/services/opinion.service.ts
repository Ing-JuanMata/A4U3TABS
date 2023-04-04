import { Injectable } from '@angular/core';

import { Opinion } from '../models/opinion';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class OpinionService {
  constructor() {}

  addOpinion(opinion: Opinion, product: Product) {
    product.opinions.push(opinion);
  }

  deleteOpinion(id: string, product: Product) {
    const index = product.opinions.findIndex((item) => item.id === id);
    product.opinions.splice(index, 1);
  }

  updateOpinion(opinion: Opinion, product: Product) {
    const index = product.opinions.findIndex((item) => item.id === opinion.id);
    product.opinions[index] = opinion;
  }
}
