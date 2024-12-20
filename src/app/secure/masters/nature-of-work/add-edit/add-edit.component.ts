import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NatureOfWorkService } from '../nature-of-work.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class NatureOfWorkAddEditComponent {

  natureOfWorkForm: UntypedFormGroup;
  isFormSubmitted = false;
  isEditMode = false;
  natureOfWorkID: number;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private natureOfWorkService: NatureOfWorkService, // NatureOfWork Service for API calls
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
        this.natureOfWorkID = +params['id'];
        this.getNatureOfWorkById();
      }
    });
  }

  private getNatureOfWorkById() {
    this.natureOfWorkService.getNatureOfWorkById(this.natureOfWorkID).subscribe(
      (result: any) => {
        this.natureOfWorkForm.patchValue({
          Name: result?.name
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private createForm() {
    this.natureOfWorkForm = this.formBuilder.group({
      Name: ['', [Validators.required]]
    });
  }

  save() {
    this.isFormSubmitted = true;
    if (this.natureOfWorkForm.invalid) {
      return;
    }

    const natureOfWorkData = {
      Id: this.isEditMode ? this.natureOfWorkID : 0,
      Name: this.natureOfWorkForm.get('Name').value
    };

    if (this.isEditMode) {
      this.updateNatureOfWork(natureOfWorkData);
    } else {
      this.createNatureOfWork(natureOfWorkData);
    }
  }



  private createNatureOfWork(data) {
    this.natureOfWorkService.addNatureOfWork(data).subscribe(
      () => {
        // Success block - Plant created successfully
        this.notificationService.success('NatureOfWork created successfully.');
        this.cancel(); // Redirect to list page only on success
      },
      error => {
        if (error.status === 400 && error.error && error.error.message) {
          // Specific duplicate entry error
          this.notificationService.error(`A NatureOfWork with '${data.Name}' already exists.`);
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

  private updateNatureOfWork(data) {
    this.natureOfWorkService.updateNatureOfWork(data).subscribe(
      () => {
        this.notificationService.success('Nature Of Work updated successfully.');
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
