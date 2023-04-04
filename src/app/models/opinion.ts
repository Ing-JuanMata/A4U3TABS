import { FormControl } from "@angular/forms";

export interface Opinion {
  id?: string;
  name: string;
  calification: number;
  comment: string;
}