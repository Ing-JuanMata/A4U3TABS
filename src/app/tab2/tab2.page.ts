import { IonRatingStarsModule } from 'ion-rating-stars';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonicModule,
  IonSearchbar,
  ToastController,
} from '@ionic/angular';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, IonRatingStarsModule, NgOptimizedImage],
})
export class Tab2Page implements OnDestroy {
  private products$?: Subscription;
  @ViewChild('search') search!: IonSearchbar;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastController: ToastController,
    private alertController: AlertController,
    public environmentInjector: EnvironmentInjector
  ) {
    this.products$ = this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
      if (this.search) {
        this.filter(this.search.value || '');
      }
    });
  }

  goToProduct(id: string) {
    this.router.navigate(['tabs', 'detalle_producto', id]);
  }
  editProduct(id: string) {
    this.router.navigate(['tabs', 'editar_producto', id]);
  }

  deleteProduct(id: string) {
    this.confirmationDialog('¿Está seguro de eliminar el producto?', () => {
      this.productService
        .deleteProduct(id)
        .then(() => {
          this.filter(this.search.value || '');
          this.presentToast('Producto eliminado', 'success');
        })
        .catch((error) => {
          console.log(error);
          this.presentToast('Error al eliminar el producto', 'danger');
        });
    });
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
      this.filter(event.detail.data);
    }
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

  ngOnDestroy(): void {
    this.products$?.unsubscribe();
  }
}
