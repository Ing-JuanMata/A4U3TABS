import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { Category } from '../models/category';
import { Product, ProductForm } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class Tab1Page {
  editMode = false;
  productForm!: FormGroup<ProductForm>;
  product?: Product;
  categories: Category[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories = this.categoryService.getCategories();
    this.productForm = new FormGroup<ProductForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      category: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      photo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sku: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.editMode = true;
        this.product = this.productService.getProduct(params.get('id')!);
        this.productForm.patchValue(this.product!);
        this.productForm.controls.sku.disable();
      }
    });
  }

  addProduct() {
    this.productService.addProduct({
      ...this.productForm.getRawValue(),
      calification: 0,
      opinions: [],
    });
    this.productForm.reset();
  }

  updateProduct() {
    this.productService.updateProduct({
      ...this.productForm.getRawValue(),
      calification: this.product!.calification,
      opinions: this.product!.opinions,
    });
    this.productForm.reset();
    this.router.navigate(['tabs', 'lista_productos']);
  }
}
