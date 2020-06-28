import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalService } from '../../common/modal.service';
import { BasemapsService } from '../../common/basemaps.service';
import { SpinnerService } from '../../../shared-module/common/spinner.service';
import { Basemap } from './../../common/models';

@Component({
  selector: 'app-add-delete',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit, OnInit {
  public display = false;
  public form: FormGroup;
  constructor(
    public modalService: ModalService,
    public basemapsService: BasemapsService,
    public spinner: SpinnerService,
    public snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.modalService.deleteModal$.subscribe((next: boolean) => this.display = next);
    this.form = new FormGroup({});
  }

  onSubmit() {
    this.modalService.toggleDeleteModal();
    const id: string = this.modalService.basemap$.getValue()._id;
    this.deleteBasemap(id);
    this.form.reset();
  }

  deleteBasemap(id: string) {
    const del = (id: string) => {
      const currentBasemaps: Basemap[] = this.basemapsService.basemaps$.getValue();
      const newBasemaps = currentBasemaps.filter((basemap: Basemap) => basemap._id !== id);
      this.basemapsService.basemaps$.next(newBasemaps);
    };

    const openSnackbar = (message: string) => {
      this.snack.open(message, 'Карта', {
        duration: 2000,
      });
    };

    this.basemapsService.deleteBasemap(id).subscribe(
      (response: void) => {
        this.spinner.stopSpinner();
        del(id);
        openSnackbar('Подложка удалена');
      },
      () => {
        this.spinner.stopSpinner();
        openSnackbar('Не удалось удалить');
      }
    )
  }

  onCancel() {
    this.form.reset();
    this.modalService.toggleDeleteModal();
  }
}
