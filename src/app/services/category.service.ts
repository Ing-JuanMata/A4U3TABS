import { Injectable } from '@angular/core';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  constructor() {
    this.categories = [
      { id: '1', name: 'Electrónicos' },
      { id: '2', name: 'Ropa' },
      { id: '3', name: 'Comida' },
      { id: '4', name: 'Hogar' },
    ];
  }

  getCategories() {
    return this.categories;
  }

  getCategory(id: string) {
    return this.categories.find((category) => category.id === id);
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }

  updateCategory(category: Category) {
    const index = this.categories.findIndex((item) => item.id === category.id);
    this.categories[index] = category;
  }

  deleteCategory(id: string) {
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories.splice(index, 1);
  }
}
