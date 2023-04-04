import { FormControl } from '@angular/forms';
import { Opinion } from './opinion';

export interface Product {
  name: string;
  price: number;
  description: string;
  photo: string;
  calification: number;
  category: string;
  sku: string;
  opinions: Opinion[];
}

export interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  photo: FormControl<string>;
  calification: FormControl<number>;
  category: FormControl<string>;
  sku: FormControl<string>;
  opinions: FormControl<Opinion[]>;
}
