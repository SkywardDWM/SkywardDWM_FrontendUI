import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FrequencyService } from '../frequency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  // standalone: true,
  // imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class FrequencyAddEditComponent {

  frequencyForm: UntypedFormGroup;
  isFormSubmitted = false;
  isEditMode = false;
  frequencyID: number;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private frequencyService: FrequencyService, // Frequency Service for API calls
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
        this.frequencyID = +params['id'];
        this.getFrequencyById();
      }
    });
  }

  private getFrequencyById() {
    this.frequencyService.getFrequencyById(this.frequencyID).subscribe(
      (result: any) => {
        this.frequencyForm.patchValue({
          Name: result?.name
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private createForm() {
    this.frequencyForm = this.formBuilder.group({
      Name: ['', [Validators.required]]
    });
  }

  save() {
    this.isFormSubmitted = true;
    if (this.frequencyForm.invalid) {
      return;
    }

    const frequencyData = {
      Id: this.isEditMode ? this.frequencyID : 0,
      Name: this.frequencyForm.get('Name').value
    };

    if (this.isEditMode) {
      this.updateFrequency(frequencyData);
    } else {
      this.createFrequency(frequencyData);
    }
  }

  

  private createFrequency(data) {
    this.frequencyService.frequencyAdd(data).subscribe(
      () => {
        // Success block - Plant created successfully
        this.notificationService.success('Frequency created successfully.');
        this.cancel(); // Redirect to list page only on success
      },
      error => {
        if (error.status === 400 && error.error && error.error.message) {
          // Specific duplicate entry error
          this.notificationService.error(`A Frequency with '${data.Name}' already exists.`);
        } else if (error.status === 500) {
          // Handle server errors
          this.notificationService.error('An unexpected server error occurred. Please try again.');
        } else {
          // General error fallback
          this.notificationService.error('Unable to create frequency. Please check your input and try again.');
        }
      }
    );
  }

  private updateFrequency(data) {
    this.frequencyService.frequencyEdit(data).subscribe(
      () => {
        this.notificationService.success('Frequency updated successfully.');
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
