import { Injectable } from '@angular/core';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { defaults as defaultControls, ScaleLine } from 'ol/control';
import { Fill, Stroke, Style, RegularShape } from 'ol/style';
import Legend from 'ol-ext/control/Legend';
import Select from 'ol/interaction/Select';
import PopupFeature from 'ol-ext/overlay/PopupFeature';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public select;
  constructor(public dataService: DataService) {
    this.select = this.getSelect();
  }

  getLegend() {
    const paramId = this.dataService.paramId$.getValue();
    const legendData = this.dataService.getLegend(paramId);
    const legend = new Legend({
      title: legendData.title,
      collapsed: true,
    });

    // Стиль для градаций легенды
    legendData.grades.map(grade =>
      legend.addRow({
        title: grade.title,
        typeGeom: 'Point',
        style: new Style({
          image: new RegularShape({
            points: 4,
            radius: 15,
            stroke: new Stroke({ color: legendData.stroke, width: 1 }),
            fill: new Fill({ color: grade.background })
          })
        })
      })
    );
    return legend;
  }

  getInteraction() {
    const interactions = defaultInteractions().extend([
      // Использование мыши для навигации по карте
      new DragRotateAndZoom(),
      // Добавить Select (выбор объекта на карте при клике),
      this.select,
    ]);
    return interactions;
  }

  // Масштабная линейка, легенда
  // Часть ненужного функционала отключена
  getControls() {
    const legend = this.getLegend();
    const scaleLine = new ScaleLine();
    const controls = defaultControls({
      attribution: false,
      zoom: false
    }).extend([scaleLine, legend]);
    return controls;
  }

  // Добавить и настроить Popup (всплывающее окно при клике на объект),
  // связать его с Select
  getOverlays() {
    const paramId = this.dataService.paramId$.getValue();
    const popup = new PopupFeature({
      popupClass: 'default anim',
      select: this.select,
      canFix: false,
      template: {
        title: f => f.get('Name'),
        attributes: this.dataService.getAtribut(paramId),
      }
    });

    const overlays = [popup];
    return overlays;
  }

  getSelect() {
    const style = new Style({
      fill: new Fill({
        color: [255, 0, 0, 0.5]
      }),
      stroke: new Stroke({
        color: [255, 0, 0, 1],
        width: 0.5
      })
    });

    const select = new Select({
      style
    });

    return select;
  }

}

