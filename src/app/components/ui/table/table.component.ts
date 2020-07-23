import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() pageTitle: string;
  @Input() icon: string;
  @Input() columns: string[];
  @Input() data: any;
  @Input() image: boolean;

  displayedColumns: string[] = [];

  isLoading = true;


  dataSource: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = [...this.columns];
    console.log(this.displayedColumns)
    this.image && this.displayedColumns.unshift("image");
  }


  ngOnChanges(): void {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
