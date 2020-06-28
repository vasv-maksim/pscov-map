import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalService } from '../../common/modal.service';
import { BasemapsService } from '../../common/basemaps.service';
import { SpinnerService } from '../../../shared-module/common/spinner.service';

import { Validator } from '../../common/validator';
import { Payload, Basemap } from '../../common/models';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit, OnInit {
  public display = false;
  public form: FormGroup;
  constructor(
    public modalService: ModalService,
    public basemapsService: BasemapsService,
    public spinner: SpinnerService,
    public snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.modalService.addModal$.subscribe(next => this.display = next);
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validator.restrictedNames]),
      descriprion: new FormControl(''),
      url: new FormControl(null, [Validators.required, Validator.restrictedNames])
    });
  }

  onSubmit() {
    const payload: Payload = this.form.value;
    this.form.reset();
    this.modalService.toggleAddModal();
    this.addBasemap(payload);
  }

  addBasemap(payload: Payload) {
    const add = (basemap: Basemap) => {
      const currentBasemaps = this.basemapsService.basemaps$.getValue();
      const newBasemaps = [basemap, ...currentBasemaps];
      this.basemapsService.basemaps$.next(newBasemaps);
    };

    const openSnackbar = (message: string) => {
      this.snack.open(message, 'Карта', {
        duration: 2000,
      });
    };

    this.basemapsService.addBasemap(payload).subscribe(
      (basemap: Basemap) => {
        this.spinner.stopSpinner();
        add(basemap);
        openSnackbar('Подложка добавлена');
      },
      () => {
        this.spinner.stopSpinner();
        openSnackbar('Не удалось добавить');
      }
    )
  }

  onCancel() {
    this.form.reset();
    this.modalService.toggleAddModal();
  }
}
