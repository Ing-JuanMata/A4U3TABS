import { IonRatingStarsModule } from 'ion-rating-stars';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';

import { Product } from '../models/product';
import { OpinionService } from '../services/opinion.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, NgOptimizedImage, CommonModule, IonRatingStarsModule],
})
export class Tab3Page {
  product?: Product;

  constructor(
    private productService: ProductService,
    private opinionService: OpinionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productService.getProduct(id);
      if (!this.product) {
        this.router.navigate(['tabs', 'lista_productos']);
      }
    }
  }

  async addOpinion() {
    const alert = await this.alertController.create({
      header: 'Añadir opinión',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
        },
        {
          name: 'comment',
          type: 'textarea',
          placeholder: 'Opinión',
        },
        {
          name: 'calification',
          type: 'number',
          placeholder: 'Valoración',
          min: 1,
          max: 5,
        },
      ],
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
          text: 'Añadir',
          handler: (data) => {
            if (
              data.calification < 1 ||
              data.calification > 5 ||
              data.name.trim() == '' ||
              data.comment.trim() == ''
            ) {
              this.presentToast('Datos incorrectos o faltantes', 'warning');
              return false;
            }
            this.confirmationDialog(
              '¿Está seguro de añadir la opinión?',
              () => {
                this.opinionService.addOpinion(
                  {
                    calification: parseFloat(data.calification),
                    comment: data.comment,
                    name: data.name,
                  },
                  this.product!
                );
                let sum = 0;
                this.product!.opinions.forEach((opinion) => {
                  sum += opinion.calification;
                });
                this.product!.calification =
                  sum / this.product!.opinions.length;
                this.productService.updateProduct(this.product!);
                this.presentToast('Opinión añadida', 'success');
                alert.dismiss();
              },
              (respuesta: any) => {
                if (respuesta.role === 'cancel')
                  this.presentToast('Operación cancelada', 'warning');
              }
            );
            return false;
          },
        },
      ],
    });
    alert.present();
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
