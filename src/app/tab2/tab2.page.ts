import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonRatingStarsModule } from 'ion-rating-stars';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, IonRatingStarsModule, NgOptimizedImage],
})
export class Tab2Page {
  constructor(private router: Router) {}

  goToProduct(id: string) {
    this.router.navigateByUrl(`tabs/detalle_producto/${id}`, {
      replaceUrl: true,
    });
  }
  editProduct(id: string) {
    this.router.navigateByUrl(`tabs/editar_producto/${id}`, {
      replaceUrl: true,
    });
  }
}
