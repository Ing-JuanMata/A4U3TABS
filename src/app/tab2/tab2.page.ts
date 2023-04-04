import { IonRatingStarsModule } from 'ion-rating-stars';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, IonicModule } from '@ionic/angular';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, IonRatingStarsModule, NgOptimizedImage],
})
export class Tab2Page {
  @ViewChild('search') search!: IonSearchbar;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  ionViewDidEnter() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  goToProduct(id: string) {
    this.router.navigate(['tabs', 'detalle_producto', id]);
  }
  editProduct(id: string) {
    this.router.navigate(['tabs', 'editar_producto', id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
    this.filter(this.search.value || '');
  }

  private filter(search: string) {
    if (!search) {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  filterProducts(event: Event) {
    if (event instanceof CustomEvent) {
      this.filter(event.detail.value);
    }
  }
}
