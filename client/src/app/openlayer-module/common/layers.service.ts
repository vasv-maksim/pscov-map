import { Injectable } from '@angular/core';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import { Fill, Stroke, Style } from 'ol/style';

import { DataService } from './data.service';
import { BasemapsService } from '../../basemaps-module/common/basemaps.service';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  constructor(
    public dataService: DataService,
    public basemapsService: BasemapsService,
  ) { }

  getVectorStyle(paramId: string) {
    const wrap = feature => {
      const param = feature.get(paramId);
      const legendData = this.dataService.getLegend(paramId);
      const gradeBackground = legendData.grades
        .find(grade => param > grade.breakpoint.min && param <= grade.breakpoint.max)
        .background;
      const style = new Style({
        fill: new Fill({
          color: gradeBackground
        }),
        stroke: new Stroke({
          color: [255, 255, 255, 1],
          width: 0.5
        })
      });
      return style;
    };
    return wrap;
  }

  // Векторный тематический слой
  getVectorLayer(paramId: string) {
    const spatialData = this.dataService.getParam(paramId);
    const vector = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(spatialData)
      }),
      style: this.getVectorStyle(paramId)
    });
    return vector;
  }

  // Растровая подложка
  getBasemapLayer() {
    const basemapLayer = new TileLayer({
      source: new XYZ({
        url: this.basemapsService.getBasemapURL()
      })
    });
    return basemapLayer;
  }

}

