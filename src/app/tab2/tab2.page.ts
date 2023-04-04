import { IonRatingStarsModule } from 'ion-rating-stars';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

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
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  goToProduct(id: string) {
    this.router.navigate(['tabs', 'detalle_producto', id]);
  }
  editProduct(id: string) {
    this.router.navigate(['tabs', 'editar_producto', id]);
  }

  filterProducts(event: Event) {
    if (event instanceof CustomEvent) {
      const value = event.detail.value;
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
