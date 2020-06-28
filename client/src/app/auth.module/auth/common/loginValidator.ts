import { FormControl } from '@angular/forms';

export class LoginValidator {
  constructor() { }

  static restrictedNames(control: FormControl): { [key: string]: boolean } {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'restrictedName': true };
  }

}
