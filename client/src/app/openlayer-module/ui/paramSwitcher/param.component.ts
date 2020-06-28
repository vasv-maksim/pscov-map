import { Component } from '@angular/core';

import { DataService } from '../../common/data.service';
import { Param } from '../../common/models';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss']
})
export class ParamComponent {
  public params: Param[];
  public paramId: string;

  constructor(public dataService: DataService) {
    this.params = this.dataService.getParams();
    this.paramId = this.dataService.paramId$.getValue();
  }

  changeParam(event) {
    this.dataService.paramId$.next(event.value);
  }
}
