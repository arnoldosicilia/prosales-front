import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css']
})
export class EditProductFormComponent implements OnInit {

  pageTitle = 'Edit Product'

  productForm: FormGroup;
  product: Product;
  fieldColspan = 4;
  errorMessage: string;
  fields: string[] = ['id', 'name', 'provRef', 'ean', 'img', 'pvd', 'pvp', 'stock', 'tax'];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialogRef: MatDialogRef<EditProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.product = this.data.product;

    this.productForm = this.fb.group({
      id: [''],
      name: [''],
      provRef: [''],
      ean: [''],
      img: [''],
      pvd: [''],
      pvp: [''],
      stock: [''],
      tax: [''],
    })
    this.onProductRetrieved()
  }

  onProductRetrieved(): void {

    this.productForm.get('id').setValue(this.product.id);
    this.productForm.get('name').setValue(this.product.name);
    this.productForm.get('provRef').setValue(this.product.provRef);
    this.productForm.get('ean').setValue(this.product.ean);
    this.productForm.get('img').setValue(this.product.img);
    this.productForm.get('pvd').setValue(this.product.pvd);
    this.productForm.get('pvp').setValue(this.product.pvp);
    this.productForm.get('stock').setValue(this.product.stock);
    this.productForm.get('tax').setValue(this.product.tax);
  }

  get id() { return this.productForm.get('id'); }
  get name() { return this.productForm.get('name'); }
  get provRef() { return this.productForm.get('provRef'); }
  get ean() { return this.productForm.get('ean'); }
  get img() { return this.productForm.get('img'); }
  get pvd() { return this.productForm.get('pvd'); }
  get pvp() { return this.productForm.get('pvp'); }
  get stock() { return this.productForm.get('stock'); }
  get tax() { return this.productForm.get('tax'); }


  updateProduct(): void {

    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the customer object values
      const client = Object.assign({}, this.product, this.productForm.value);
      console.log(client);
      this.productService.updateProduct(client)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }

  }

  deleteProduct() {
    console.log("se llama al delete client")
    this.productService.deleteProduct(this.product.id);
    this.onSaveComplete();
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.dialogRef.close();
  }
}
