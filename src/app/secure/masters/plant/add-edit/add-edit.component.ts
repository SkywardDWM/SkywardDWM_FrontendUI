import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../plant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  // standalone: true,
  // imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class PlantAddEditComponent {

  plantForm: UntypedFormGroup;
  isFormSubmitted = false;
  isEditMode = false;
  plantID: number;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private plantService: PlantService,  // Assume a service to manage tank data
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
        this.plantID = +params['id'];
        this.getPlantById();
      }
    });
  }

  private getPlantById() {
    this.plantService.getPlantById(this.plantID).subscribe(
      (result: any) => {
        this.plantForm.patchValue({
          PlantName: result?.plantName,
          Alias: result?.alias,
          Description: result?.description
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private createForm() {
    this.plantForm = this.formBuilder.group({
      PlantName: ['', [Validators.required]],
      Alias: ['', [Validators.required]],
      Description: ['']
    });
  }

  save() {
    this.isFormSubmitted = true;
    if (this.plantForm.invalid) {
      return;
    }

    const plantData = {
      Id: this.isEditMode ? this.plantID : 0,
      PlantName: this.plantForm.get('PlantName').value,
      Alias: this.plantForm.get('Alias').value,
      Description: this.plantForm.get('Description').value
    };

    if (this.isEditMode) {
      this.updatePlant(plantData);
    } else {
      this.createPlant(plantData);
    }
  }

  private createPlant(data) {
    this.plantService.plantAdd(data).subscribe(
      () => {
        // Success block - Plant created successfully
        this.notificationService.success('Plant created successfully.');
        this.cancel(); // Redirect to list page only on success
      },
      error => {
        if (error.status === 400 && error.error && error.error.message) {
          // Specific duplicate entry error
          this.notificationService.error(`A Plant with '${data.PlantName}' already exists.`);
        } else if (error.status === 500) {
          // Handle server errors
          this.notificationService.error('An unexpected server error occurred. Please try again.');
        } else {
          // General error fallback
          this.notificationService.error('Unable to create plant. Please check your input and try again.');
        }
      }
    );
  }
  
  

  private updatePlant(data) {
    this.plantService.plantEdit(data).subscribe(
      () => {
        this.notificationService.success('Plant updated successfully.');
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
