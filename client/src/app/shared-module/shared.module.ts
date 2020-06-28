import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material.module';

import { NotFound } from './not-found/not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialModule,
  ],
  declarations: [NotFound, SpinnerComponent],
  exports: [CommonModule, NotFound, SpinnerComponent, MaterialModule]
})
export class SharedModule { }
