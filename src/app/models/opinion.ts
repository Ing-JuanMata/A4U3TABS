import { FormControl } from "@angular/forms";

export interface Opinion {
  name: string;
  calification: number;
  comment: string;
}

export interface OpinionForm {
  name: FormControl<string>;
  calification: FormControl<number>;
  comment: FormControl<string>;
}