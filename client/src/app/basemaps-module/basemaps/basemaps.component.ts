import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BasemapsService } from '../common/basemaps.service';
import { ModalService } from '../common/modal.service';
import { SpinnerService } from '../../shared-module/common/spinner.service';

import { Basemap } from '../common/models';

@Component({
  selector: 'app-basemaps',
  templateUrl: './basemaps.component.html',
  styleUrls: ['./basemaps.component.scss']
})
export class BasemapsComponent implements OnInit {
  public displayedColumns: string[] = ['title', 'description', 'date', 'url', 'actions'];
  public basemaps: Basemap[] = [];
  public dataSource: MatTableDataSource<Basemap>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public basemapsService: BasemapsService,
    public modalService: ModalService,
    public spinner: SpinnerService,
  ) { }

  ngOnInit() {
    this.watchBasemaps();
    this.getBasemaps();
  }

  getBasemaps(): void {
    this.basemapsService.getBasemapsFromServer()
      .subscribe(
        (basemaps: Basemap[]) => {
          this.spinner.stopSpinner();
          this.basemapsService.basemaps$.next(basemaps);
        },
        () => this.spinner.stopSpinner()
      );
  }

  watchBasemaps(): void {
    this.basemapsService.basemaps$.subscribe(
      (basemaps: Basemap[]) => {
        this.basemaps = basemaps;
        this.createDataSource();
      }
    )
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource(this.basemaps);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
