import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class Tab1Page {
  editMode = false;
  constructor(private activatedRoute: ActivatedRoute) {}

  ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe(params =>{
      if(params.get('id')){
        this.editMode = true;
      }
      console.log(params);
    })
  }
}
