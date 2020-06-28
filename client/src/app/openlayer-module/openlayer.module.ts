import { NgModule } from '@angular/core';
import { MapComponent } from './ol/map/map.component';

import { SharedModule } from '../shared-module/shared.module';
import { MaterialModule } from '../shared-module/material-module/material.module';

import { ParamComponent } from './ui/paramSwitcher/param.component';
import { BasemapComponent } from './ui/basemapSwitcher/basemap.component';
import { OlComponent } from './ol/ol.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';


@NgModule({
  declarations: [
    MapComponent,
    ParamComponent,
    BasemapComponent,
    OlComponent,
    ToolbarComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
  ],
  providers: [],
  exports: [
    OlComponent,
    ToolbarComponent,
  ]
})
export class OpenLayerModule { }
