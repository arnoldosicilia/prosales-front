import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Subscription } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-edit-client-form',
  templateUrl: './edit-client-form.component.html',
  styleUrls: ['./edit-client-form.component.css']
})
export class EditClientFormComponent implements OnInit {

  private sub: Subscription;

  pageTitle = 'Edit Client'

  clientForm: FormGroup;
  client: Client;
  fieldColspan = 4;
  errorMessage: string;
  fields: string[] = ['nif', 'email', 'defaultPayMethod', 'commercialName', 'fiscalName', 'address', 'city', 'province', 'zipCode', 'country', 'web', 'telNumber', 'credit'];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<EditClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getClient(id);
      }
    );

    this.clientForm = this.fb.group({
      nif: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
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

  getClient(id: number): void {
    this.clientService.getClient(id)
      .subscribe(
        (client: Client) => this.onClientRetrieved(client)
      );
  }

  onClientRetrieved(client: Client): void {
    this.client = client;
    this.clientForm.get('nif').setValue(this.client.nif);
    this.clientForm.get('email').setValue(this.client.email);
    this.clientForm.get('commercialName').setValue(this.client.commercialName);
    this.clientForm.get('fiscalName').setValue(this.client.fiscalName);
    this.clientForm.get('address').setValue(this.client.address);
    this.clientForm.get('city').setValue(this.client.city);
    this.clientForm.get('province').setValue(this.client.province);
    this.clientForm.get('zipCode').setValue(this.client.zipCode);
    this.clientForm.get('country').setValue(this.client.country);
    this.clientForm.get('web').setValue(this.client.web);
    this.clientForm.get('telNumber').setValue(this.client.telNumber);
    this.clientForm.get('credit').setValue(this.client.credit);
  }

  get nif() { return this.clientForm.get('nif'); }
  get email() { return this.clientForm.get('email'); }
  get commercialName() { return this.clientForm.get('commercialName'); }
  get fiscalName() { return this.clientForm.get('fiscalName'); }
  get address() { return this.clientForm.get('address'); }
  get city() { return this.clientForm.get('city'); }
  get province() { return this.clientForm.get('province'); }
  get zipCode() { return this.clientForm.get('zipCode'); }
  get country() { return this.clientForm.get('country'); }
  get web() { return this.clientForm.get('web'); }
  get telNumber() { return this.clientForm.get('telNumber'); }
  get credit() { return this.clientForm.get('credit'); }


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
