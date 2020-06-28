import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalService } from '../../common/modal.service';
import { BasemapsService } from '../../common/basemaps.service';
import { SpinnerService } from '../../../shared-module/common/spinner.service';
import { Validator } from '../../common/validator';
import { Basemap, Payload } from '../../common/models';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public display = false;
  public form: FormGroup;
  public basamap: Basemap;
  constructor(
    public modalService: ModalService,
    public basemapsService: BasemapsService,
    public spinner: SpinnerService,
    public snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.modalService.editModal$.subscribe(next => this.display = next);
    this.initializeForm();
    this.updateForm();
  }

  initializeForm() {
    this.basamap = this.modalService.basemap$.getValue();
    this.form = new FormGroup({
      title: new FormControl(this.basamap.title, [Validators.required, Validator.restrictedNames]),
      description: new FormControl(this.basamap.description),
      url: new FormControl(this.basamap.url, [Validators.required, Validator.restrictedNames])
    });
  }

  updateForm() {
    this.modalService.basemap$.subscribe(basamap => {
      this.form.patchValue({
        title: basamap.title,
        description: basamap.description,
        url: basamap.url,
      })
    });
  }

  onSubmit() {
    this.modalService.toggleEditModal();
    const id: string = this.modalService.basemap$.getValue()._id;
    const payload: Payload = { _id: id, ...this.form.value };
    this.form.reset();
    this.editBasemap(payload);
  }

  editBasemap(payload: Payload) {
    const edit = (basemap: Basemap) => {
      const currentBasemaps = this.basemapsService.basemaps$.getValue();
      const filteredBasemaps = currentBasemaps.filter((basemap: Basemap) => basemap._id !== payload._id);
      const newBasemaps = [basemap, ...filteredBasemaps];
      this.basemapsService.basemaps$.next(newBasemaps);
    };

    const openSnackbar = (message: string) => {
      this.snack.open(message, 'Карта', {
        duration: 2000,
      });
    };

    this.basemapsService.updateBasemap(payload).subscribe(
      (basemap: Basemap) => {
        this.spinner.stopSpinner();
        edit(basemap);
        openSnackbar('Подложка отредактирована');
      },
      () => {
        this.spinner.stopSpinner();
        openSnackbar('Не удалось отредактирована');
      }
    )
  }

  onCancel() {
    this.form.reset();
    this.modalService.toggleEditModal();
  }
}
