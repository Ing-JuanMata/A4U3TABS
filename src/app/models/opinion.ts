import { FormControl } from "@angular/forms";

export interface Opinion {
  id: string;
  name: string;
  calification: number;
  comment: string;
}

export interface OpinionForm {
  id: FormControl<string>;
  name: FormControl<string>;
  calification: FormControl<number>;
  comment: FormControl<string>;
}