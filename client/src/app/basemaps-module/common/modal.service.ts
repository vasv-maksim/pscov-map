import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Basemap } from '../common/models'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public addModal$: BehaviorSubject<boolean>;
  public editModal$: BehaviorSubject<boolean>;
  public deleteModal$: BehaviorSubject<boolean>;
  public basemap$: BehaviorSubject<Basemap>;

  constructor() {
    this.addModal$ = new BehaviorSubject<boolean>(false);
    this.editModal$ = new BehaviorSubject<boolean>(false);
    this.deleteModal$ = new BehaviorSubject<boolean>(false);
    this.basemap$ = new BehaviorSubject<Basemap>({ _id: '', title: '', description: '', user: '', url: '', date: '' });
  }

  toggleAddModal() {
    const addModal = this.addModal$.getValue();
    this.addModal$.next(!addModal);
  }

  toggleEditModal(basemap?) {
    if (basemap) {
      this.basemap$.next(basemap);
    }
    const editModal$ = this.editModal$.getValue();
    this.editModal$.next(!editModal$);
  }

  toggleDeleteModal(basemap?) {
    if (basemap) {
      this.basemap$.next(basemap);
    }
    const deleteModal$ = this.deleteModal$.getValue();
    this.deleteModal$.next(!deleteModal$);
  }

}

