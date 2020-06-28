import { Component } from '@angular/core';

import { SpinnerService } from '../common/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent { 
  constructor(public spinner: SpinnerService) {}
}
