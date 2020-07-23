import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;
  fieldColspan = 4;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nif: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      defaultPayMethod: ['', [Validators.required]],
      commercialName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      fiscalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      web: ['', [Validators.required]],
      telNumber: ['', [Validators.required]],
      credit: ['', [Validators.required]]
    })
  }

  saveClient(): void {

    if (this.clientForm.dirty && this.clientForm.valid) {
      // Copy the form values over the customer object values
      const client = Object.assign({}, this.client, this.clientForm.value);
      console.log(client);
      this.clientService.createClient(client)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.clientForm.dirty) {
      this.onSaveComplete();
    }
    console.log(this.clientForm.valid)
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.clientForm.reset();
    this.dialogRef.close();
  }
}
