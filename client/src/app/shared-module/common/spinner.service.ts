import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isSpinning: boolean = false;

  getSpinner() {
    return this.isSpinning;
  }
  
  startSpinner() {
    this.isSpinning = true;
  }

  stopSpinner() {
    this.isSpinning = false;
  }

}

