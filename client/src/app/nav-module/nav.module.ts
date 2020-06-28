import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { SideComponent } from './side/side.component';
import { LogoutComponent } from './side/logout/logout.component';

@NgModule({
  declarations: [
    SideComponent,
    LogoutComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    SideComponent,
    LogoutComponent,
  ]
})
export class NavModule { }
