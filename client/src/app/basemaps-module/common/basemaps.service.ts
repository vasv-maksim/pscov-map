import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SpinnerService } from '../../shared-module/common/spinner.service';

import { Basemap, Payload } from './models';

@Injectable({
  providedIn: 'root'
})
export class BasemapsService {
  public basemapId$: BehaviorSubject<string>;
  public basemaps$: BehaviorSubject<Basemap[]>;
  public url = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  constructor(
    private http: HttpClient,
    public spinner: SpinnerService,
  ) {
    this.basemapId$ = new BehaviorSubject<string>('OSM');
    this.basemaps$ = new BehaviorSubject<Basemap[]>([]);
  }

  // CRUD
  addBasemap(body: Payload) {
    return this.http.post<Basemap>(`api/basemaps/`, body);
  }

  getBasemapsFromServer(): Observable<Basemap[]> {
    const url = 'api/basemaps';
    this.spinner.startSpinner();
    return this.http.get<Basemap[]>(url);
  }

  updateBasemap(body: Payload) {
    this.spinner.startSpinner();
    return this.http.patch<Basemap>(`api/basemaps/${body._id}`, body);
  }

  deleteBasemap(id: string) {
    this.spinner.startSpinner();
    return this.http.delete<void>(`api/basemaps/${id}`);
  }

  // Геттеры/Сеттеры
  getBasemapURL(): string {
    return this.url;
  }

  setURL(url: string) {
    this.url = url;
  }

}

