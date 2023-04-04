import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  constructor() {
    this.products = [
      {
        name: 'iPhone 11',
        price: 1000,
        description:
          'El iPhone 11 es un smartphone de gama alta de Apple con pantalla LCD de 6.1 pulgadas, resolución de 1792 x 828 píxeles, procesador Apple A13 Bionic, 4 GB de RAM, 64/128/256 GB de almacenamiento interno, cámara trasera de 12 MP, cámara frontal de 12 MP, batería de 3110 mAh, y corre iOS 13.',
        photo: 'https://www.picsum.photos/420',
        calification: 4,
        category: 'Electrónicos',
        sku: '1',
        opinions: [
          {
            id: '1',
            name: 'Juan',
            calification: 4,
            comment: 'Muy buen producto',
          },
        ],
      },
      {
        name: 'iPhone 12',
        price: 2000,
        description:
          'El iPhone 12 es un smartphone de gama alta de Apple con pantalla LCD de 6.1 pulgadas, resolución de 1792 x 828 píxeles, procesador Apple A13 Bionic, 4 GB de RAM, 64/128/256 GB de almacenamiento interno, cámara trasera de 12 MP, cámara frontal de 12 MP, batería de 3110 mAh, y corre iOS 13.',
        photo: 'https://www.picsum.photos/420',
        calification: 4,
        category: 'Electrónicos',
        sku: '2',
        opinions: [
          {
            id: '2',
            name: 'Juan',
            calification: 4,
            comment: 'Muy buen producto',
          },
        ],
      },
      {
        name: 'iPhone 13',
        price: 3000,
        description:
          'El iPhone 13 es un smartphone de gama alta de Apple con pantalla LCD de 6.1 pulgadas, resolución de 1792 x 828 píxeles, procesador Apple A13 Bionic, 4 GB de RAM, 64/128/256 GB de almacenamiento interno, cámara trasera de 12 MP, cámara frontal de 12 MP, batería de 3110 mAh, y corre iOS 13.',
        photo: 'https://www.picsum.photos/420',
        calification: 4,
        category: 'Electrónicos',
        sku: '3',
        opinions: [
          {
            id: '3',
            name: 'Juan',
            calification: 4,
            comment: 'Muy buen producto',
          },
        ],
      },
    ];
  }

  getProducts() {
    return this.products;
  }

  getProduct(id: string) {
    return this.products.find((product) => product.sku === id);
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex((item) => item.sku === product.sku);
    this.products[index] = product;
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((item) => item.sku === id);
    this.products.splice(index, 1);
  }
}
