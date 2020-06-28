import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import Map from 'ol/Map';

import { ViewService } from '../../common/view.service';
import { LayersService } from '../../common/layers.service';
import { MapService } from '../../common/map.service';
import { DataService } from '../../common/data.service';
import { BasemapsService } from '../../../basemaps-module/common/basemaps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public map: any;
  public basemap: any;
  public vector: any;
  // Подписки
  public basemapSub: SubscriptionLike;
  public paramSub: SubscriptionLike;

  constructor(
    public viewService: ViewService,
    public layersService: LayersService,
    public mapService: MapService,
    public dataService: DataService,
    public basemapsService: BasemapsService,
  ) { }

  ngOnInit() {
    this.basemap = this.layersService.getBasemapLayer();
    this.basemap.setZIndex(0);
    const paramId = this.dataService.paramId$.getValue();
    this.vector = this.layersService.getVectorLayer(paramId);
    this.vector.setZIndex(1);

    this.map = new Map({
      layers: [
        this.basemap,
        this.vector
      ],
      view: this.viewService.getView(),
      interactions: this.mapService.getInteraction(),
      controls: this.mapService.getControls(),
      overlays: this.mapService.getOverlays(),
    });

    // Обновить карту в соответствии с параметрами, выбираемыми пользователем
    this.basemapSub = this.basemapsService.basemapId$.subscribe((nextBasemap: string) => this.updateBasemap());
    this.paramSub = this.dataService.paramId$.subscribe((nextParam: string) => this.updateVector(nextParam));
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
  }

  updateVector(paramId: string) {
    // Обновить векторный тематический слой
    this.map.removeLayer(this.vector);
    this.vector = this.layersService.getVectorLayer(paramId);
    this.vector.setZIndex(1);
    this.map.addLayer(this.vector);

    // Обновить легенду
    const oldLegend = this.map.getControls().array_[2];
    this.map.removeControl(oldLegend);
    const newlegend = this.mapService.getLegend();
    this.map.addControl(newlegend);
  }

  updateBasemap() {
    // Обновить растровую подложку
    this.map.removeLayer(this.basemap);
    this.basemap = this.layersService.getBasemapLayer();
    this.basemap.setZIndex(0);
    this.map.addLayer(this.basemap);
  }

  addGrid(isGrid: boolean) {
    // Похоже сеть сейчас поддерживает
    // только в EPSG:4326 // TO DO, когда добавятся проекции
  }

  ngOnDestroy() {
    this.basemapSub.unsubscribe();
    this.paramSub.unsubscribe();
  }

}
