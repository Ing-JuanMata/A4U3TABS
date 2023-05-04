import { IonRatingStarsModule } from 'ion-rating-stars';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EnvironmentInjector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';

import { Product } from '../models/product';
import { OpinionService } from '../services/opinion.service';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { Opinion } from '../models/opinion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, NgOptimizedImage, CommonModule, IonRatingStarsModule],
})
export class Tab3Page implements OnDestroy {
  private product$?: Subscription;
  private opinions$?: Subscription;
  product?: Product;
  opinions: Opinion[] = [];

  constructor(
    private productService: ProductService,
    private opinionService: OpinionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    public environmentInjector: EnvironmentInjector
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.product$ = this.productService
        .getProduct(id)
        .subscribe((products) => {
          if (products.length == 0) {
            this.presentToast('Producto no encontrado', 'danger');
            this.router.navigate(['tabs', 'lista_productos']);
            return;
          }
          this.product = products[0];
          this.opinions$ = this.opinionService
            .getOpinions(this.product)
            .subscribe((opinions) => {
              this.opinions = opinions;
            });
        });
    }
  }

  ionViewDidLeave() {
    this.product$?.unsubscribe();
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
                this.opinionService
                  .addOpinion(
                    {
                      calification: parseFloat(data.calification),
                      comment: data.comment,
                      name: data.name,
                    },
                    this.product!
                  )
                  .then((data) => {
                    this.presentToast('Opinión añadida', 'success');
                    console.log(data);
                    alert.dismiss();
                  })
                  .catch((error) => {
                    this.presentToast('Error al añadir la opinión', 'danger');
                    console.log(error);
                  });
                return false;
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

  ngOnDestroy(): void {
    this.product$?.unsubscribe();
  }
}
