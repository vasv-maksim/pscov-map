import { Injectable } from '@angular/core';
import View from 'ol/View';
import proj4 from 'proj4';
import Projection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
 
  // Начальные координаты, масштаб и проекция карты
  getView() {
    const view = new View({
      center: [12075000, 6376186],
      zoom: 7,
      projection: this.getProjection()
    });
    return view;
  }

  getProjection() {
    // Параметры проекции
    proj4.defs(
      'ESRI:2646',
      '+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=12500000 +y_0=0 +ellps=krass +units=m +no_defs'
    );
    register(proj4);

    // Добавление новой проекции
    // Pulkovo 1995 / 3-degree Gauss-Kruger zone 12
    const projection = new Projection({
      code: 'ESRI:2646',
      extent: [-1000000.0, -1000000.0, 19009954.0, 10000000.0],
    });
    return projection;
  }

}

