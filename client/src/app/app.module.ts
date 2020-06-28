import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth.module/auth.module';
import { NavModule } from './nav-module/nav.module';
import { OpenLayerModule } from './openlayer-module/openlayer.module';
import { SharedModule } from './shared-module/shared.module';
import { BasemapsModule } from './basemaps-module/basemaps.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AuthModule,
    NavModule,
    OpenLayerModule,
    SharedModule,
    BasemapsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
