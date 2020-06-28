import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared-module/shared.module';

import { BasemapsComponent } from './basemaps/basemaps.component';
import { AddModalComponent } from './modals/add-modal/add-modal.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    BasemapsComponent,
    AddModalComponent,
    EditModalComponent,
    DeleteModalComponent,
  ],
  imports: [
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [ 
    BasemapsComponent, 
   ]
})
export class BasemapsModule { }
