import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { spatialData, legend } from './data/data';
import { Legend, Param } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public legend: Legend[];
  public spatialData: Param[]; // GeoJSON
  public paramId$: BehaviorSubject<string>;
  public isGrid$: BehaviorSubject<boolean>;
  constructor() {
    this.legend = legend;
    this.spatialData = spatialData;
    this.paramId$ = new BehaviorSubject('KRS');
  }

  getParam(paramId: string): Param {
    return this.spatialData.find(param => param.id === paramId).data;
  }

  getParams(): Param[] {
    return this.spatialData;
  }

  getLegend(paramId: string): Legend {
    return this.legend.find(leg => leg.id === paramId);
  }

  getLegends(): Legend[] {
    return this.legend;
  }

  getAtribut(paramId: string) {
    const title = this.spatialData.find(param => param.id === paramId).title;
    return {
      [paramId]: { title }
    }
  }

}

