import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';

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
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    public environmentInjector: EnvironmentInjector
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
      } else {
        this.editMode = false;
        this.productForm.controls.sku.enable();
        this.productForm.reset();
      }
    });
  }

  addProduct() {
    this.confirmationDialog('¿Está seguro de agregar el producto?', () => {
      this.productService.addProduct({
        ...this.productForm.getRawValue(),
        calification: 0,
        opinions: [],
      });
      this.productForm.reset();
      this.presentToast('Producto agregado', 'success');
    });
  }

  updateProduct() {
    this.confirmationDialog('¿Está seguro de actualizar el producto?', () => {
      this.productService.updateProduct({
        ...this.productForm.getRawValue(),
        calification: this.product!.calification,
        opinions: this.product!.opinions,
      });
      this.presentToast('Producto actualizado', 'success');
      this.router.navigate(['tabs', 'lista_productos']);
    });
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      color,
    });
    toast.present();
  }

  private async confirmationDialog(
    header: string,
    handler?: Function,
    dismissFunction?: Function
  ) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Operación cancelada', 'warning');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handler) handler();
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      if (dismissFunction) dismissFunction(respuesta);
    });
  }
}
