import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
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
  constructor() {}
}
