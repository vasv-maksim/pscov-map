import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasemapsService } from '../../../basemaps-module/common/basemaps.service';

import { Basemap } from '../../../basemaps-module/common/models';

@Component({
  selector: 'app-basemap',
  templateUrl: './basemap.component.html',
  styleUrls: ['./basemap.component.scss']
})
export class BasemapComponent implements OnInit {
  public defaultBasemaps: Basemap[] = [{
    _id: 'OSM',
    title: 'OSM',
    description: 'defaultBasemap',
    user: 'Admin',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    date: '2020-05-10T17:11:41.612+00:00'
  },
  {
    _id: 'OpenCycleMap',
    title: 'OpenCycleMap',
    description: 'dOpenCycleMap',
    user: 'Admin',
    url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
    date: '2020-05-10T17:11:41.612+00:00'
  }];

  public basemaps: Basemap[];
  public basemapId: string;
  public basemapsSub: Subscription;

  constructor(public basemapsService: BasemapsService) {
    this.basemapId = this.defaultBasemaps[0]._id;
    this.basemaps = [...this.defaultBasemaps];
  }

  ngOnInit() {
    this.basemapsSub = this.basemapsService.getBasemapsFromServer()
      .subscribe((response: Basemap[]) => {
        this.basemaps = [...this.defaultBasemaps, ...response]
      }
      );
  }

  changeBasemap(event) {
    const url = this.basemaps.find(basemap => basemap._id === event.value).url;
    this.basemapsService.setURL(url);
    this.basemapsService.basemapId$.next(event.value);
  }

  ngOnDestroy(): void {
    this.basemapsSub.unsubscribe();
  }

}
