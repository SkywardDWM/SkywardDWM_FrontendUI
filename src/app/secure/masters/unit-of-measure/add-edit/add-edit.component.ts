import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitOfMeasureService } from '../unit-of-measure.service';  // Assume service for managing data
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class UnitOfMeasureAddEditComponent {

  unitForm: UntypedFormGroup;
  isFormSubmitted = false;
  isEditMode = false;
  unitID: number;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private unitService: UnitOfMeasureService,
    private formBuilder: UntypedFormBuilder,
    private notificationService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getRoute();
  }

  private getRoute() {
    this.activatedRoute.params.subscribe(params => {
      this.isEditMode = !!params['id'];
      if (this.isEditMode) {
        this.unitID = +params['id'];
        this.getUnitById();
      }
    });
  }

  private getUnitById() {
    this.unitService.getUnitOfMeasureById(this.unitID).subscribe(
      (result: any) => {
        this.unitForm.patchValue({
          UnitName: result?.unitName
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private createForm() {
    this.unitForm = this.formBuilder.group({
      UnitName: ['', [Validators.required]]
    });
  }

  save() {
    this.isFormSubmitted = true;
    if (this.unitForm.invalid) {
      return;
    }

    const unitData = {
      Id: this.isEditMode ? this.unitID : 0,
      UnitName: this.unitForm.get('UnitName').value
    };

    if (this.isEditMode) {
      this.updateUnit(unitData);
    } else {
      this.createUnit(unitData);
    }
  }

  private createUnit(data) {
    this.unitService.unitOfMeasureAdd(data).subscribe(
      () => {
        // Success block - Plant created successfully
        this.notificationService.success('Unit created successfully.');
        this.cancel(); // Redirect to list page only on success
      },
      error => {
        if (error.status === 400 && error.error && error.error.message) {
          // Specific duplicate entry error
          this.notificationService.error(`A Unit with '${data.UnitName}' already exists.`);
        } else if (error.status === 500) {
          // Handle server errors
          this.notificationService.error('An unexpected server error occurred. Please try again.');
        } else {
          // General error fallback
          this.notificationService.error('Unable to create Unit. Please check your input and try again.');
        }
      }
    );
  }

  private updateUnit(data) {
    this.unitService.unitOfMeasureEdit(data).subscribe(
      () => {
        this.notificationService.success('Unit of Measure updated successfully.');
        this.cancel();
      },
      error => {
        this.error = error;
      }
    );
  }

  cancel() {
    if (this.isEditMode) {
      this.router.navigate(['../..', 'list'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['..', 'list'], { relativeTo: this.activatedRoute });
    }
  }
}
