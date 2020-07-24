import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesFormComponent } from './edit-sales-form.component';

describe('EditSalesFormComponent', () => {
  let component: EditSalesFormComponent;
  let fixture: ComponentFixture<EditSalesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
