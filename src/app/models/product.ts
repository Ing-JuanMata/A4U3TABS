import { FormControl } from '@angular/forms';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  calification: number;
  category: string;
  sku: string;
  numberOfOpinions?: number;
  deleted?: boolean;
}

export interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  photo: FormControl<string>;
  category: FormControl<string>;
  sku: FormControl<string>;
}
