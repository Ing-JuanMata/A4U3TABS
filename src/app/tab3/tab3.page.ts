import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonRatingStarsModule } from 'ion-rating-stars';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, NgOptimizedImage, CommonModule, IonRatingStarsModule],
})
export class Tab3Page {
  constructor() {}
}
