import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthUtils } from 'src/app/utils/auth-utils';
import { MatDialog } from '@angular/material/dialog';
import { EditClientFormComponent } from '../../pages/clients/edit-client-form/edit-client-form.component';
import { EditProductFormComponent } from '../../pages/products/edit-product-form/edit-product-form.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  isAdmin: boolean;

  closeModal: boolean = false;

  displayedColumns: string[] = [];

  isLoading = true;


  dataSource: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private location: Location,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.isAdmin = AuthUtils.isAdmin();
    this.displayedColumns = [...this.columns];
    this.image && this.displayedColumns.unshift("image");
    this.isAdmin && this.displayedColumns.unshift("edit");
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

  openEdit(element) {

    switch (this.pageTitle) {
      case "Clients":
        console.log("se llama a switch clients", element)
        const dialogRef1 = this.dialog.open(EditClientFormComponent, {
          data: { client: element },
          height: '470px',
          width: '800px',
        });

        dialogRef1.afterClosed().subscribe((result) => {
          console.log('closed');
          this.closeModal = !this.closeModal;
          location.reload();
          console.log(this.closeModal);
          console.log(this.data);

        });
        break;

      case "Products":
        console.log("se llama a switch products", element)
        const dialogRef2 = this.dialog.open(EditProductFormComponent, {
          data: { product: element },
          height: '470px',
          width: '800px',
        });

        dialogRef2.afterClosed().subscribe((result) => {
          this.router.navigate(['/products']);
        });
        break;

      case "Sales":
        console.log("se llama a switch sales", element)
        const dialogRef3 = this.dialog.open(EditProductFormComponent, {
          data: { product: element },
          height: '470px',
          width: '800px',
        });

        dialogRef2.afterClosed().subscribe((result) => {
          console.log('closed');
        });
        break;



    }
  }
}
