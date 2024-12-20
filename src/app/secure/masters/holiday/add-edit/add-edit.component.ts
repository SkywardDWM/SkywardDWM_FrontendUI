import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HolidayService } from '../holiday.service';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class HolidayAddEditComponent implements OnInit {
  frmHoliday: UntypedFormGroup;
  HolidayDetails: FormArray;
  isEditMode: boolean;
  holidayId: number;
  plantsList: any[] = [];
  isFormSubmitted: boolean = false;
  HolidayData: any;
  routerSub: Subscription;
  IsViewPermission: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private holidayService: HolidayService,
    private notificationService: ToastrService,
    private permissionService: PermissionService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getHolidayRoute();
    this.loadDropdowns();
    this.IsViewPermission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - View');
  
  }

  private getHolidayRoute() {
    this.routerSub = this.activatedRoute.params.subscribe((params) => {
      this.isEditMode = !!params['id'];
      this.createForm();
      if (this.isEditMode) {
        this.holidayId = params['id'];
        this.getHolidayDetailsById();
      }
    });
  }

  private getHolidayDetailsById() {
    this.holidayService.getHolidayById(this.holidayId).subscribe(
      (result: any) => {
        this.HolidayData = result;
        this.setHolidayData();
      },
      () => {
        this.notificationService.error('Error fetching holiday details.');
      }
    );
  }

  private setHolidayData() {
    this.frmHoliday.patchValue({
      ...this.HolidayData,
      plantId: this.HolidayData.plantIdList || []
    });

    // Clear current rows before adding fetched rows
    this.HolidayDetails.clear();

    this.HolidayData.holidayDetails.forEach((detail: any) => {
      this.addHolidayDetails(detail);
    });
  }

  private loadDropdowns() {
    this.holidayService.getPlantsList().subscribe((result: any) => {
      this.plantsList = result;
    });
  }

  createForm() {
    this.frmHoliday = this.formBuilder.group({
      code: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      calendarName: ['', Validators.required],
      type: [null],
      plantId: ['', Validators.required],
      HolidayDetails: this.formBuilder.array([])
    });
    this.HolidayDetails = this.frmHoliday.get('HolidayDetails') as FormArray<FormGroup>;

    // Add an initial empty row
    this.addHolidayDetails();
  }

  createHolidayDetail(detail: any = null): FormGroup {
    return this.formBuilder.group({
      holidayName: [detail?.holidayName || '', Validators.required],
      holidayDate: [detail?.holidayDate || '', Validators.required],
      remark: [detail?.remark || '']
    });
  }

  // addHolidayDetails(detail: any = null) {
  //   debugger
  //   // Get the last row in the HolidayDetails FormArray
  //   const lastRow = this.HolidayDetails.at(this.HolidayDetails.length - 1) as FormGroup;

  //   // Check if the last row is invalid
  //   if (lastRow && lastRow.invalid) {
  //     // Mark all controls in the last row as touched to display validation errors
  //     Object.keys(lastRow.controls).forEach((key) => {
  //       lastRow.get(key)?.markAsTouched();
  //     });
  
  //     // Notify the user about the validation error
  //     this.notificationService.error('Please fill out all required fields before adding a new row.', 'Validation Error');
  
  //     // Manually trigger change detection to ensure the UI updates correctly
  //     this.changeDetector.detectChanges();
  //     return;
  //   }
  
  //   // Add a new row if the last row is valid
  //   this.HolidayDetails.push(this.createHolidayDetail(detail));

  // }

  addHolidayDetails(detail: any = null) {
    //debugger;

    // Get the last row in the HolidayDetails FormArray
    const lastRow = this.HolidayDetails.at(this.HolidayDetails.length - 1) as FormGroup;

    // Check if the last row is invalid
    if (lastRow && lastRow.invalid) {
        // Mark all controls in the last row as touched to display validation errors
        Object.keys(lastRow.controls).forEach((key) => {
            lastRow.get(key)?.markAsTouched();
        });

        // Notify the user about the validation error
        this.notificationService.error(
            'Please fill out all required fields before adding a new row.',
            'Validation Error'
        );

        // Manually trigger change detection to ensure the UI updates correctly
        this.changeDetector.detectChanges();
        return;
    }
    // Retrieve start date and end date
    const startDate = this.frmHoliday.get('startDate')?.value;
    const endDate = this.frmHoliday.get('endDate')?.value;

    // Loop through each row in the HolidayDetails FormArray and check holidayDate
    for (let i = 0; i < this.HolidayDetails.length; i++) {
      const holidayRow = this.HolidayDetails.at(i) as FormGroup;
      const holidayDateControl = holidayRow.get('holidayDate');

      if (holidayDateControl) {
          const holidayDate = new Date(holidayDateControl.value);

          // Check if holiday date is within the range
          if (holidayDate < new Date(startDate) || holidayDate > new Date(endDate)) {
              this.notificationService.error(
                  `Holiday Date in row ${i + 1} must be between Start Date and End Date.`,
                  'Validation Error'
              );
              return; // Exit if any row is invalid
          }
      }
  }

    // Add a new row if the last row is valid and dates are within range
    this.HolidayDetails.push(this.createHolidayDetail(detail));
}


  removeHolidayDetail(index: number) {
    if (this.HolidayDetails.length > 1) {
      this.HolidayDetails.removeAt(index);
    } else {
      this.notificationService.error('At least one holiday detail is required.');
    }
  }
  save() {
    //debugger
    this.isFormSubmitted = true;
  
    // Check if the main form is invalid
    if (this.frmHoliday.invalid) {
      this.notificationService.error('Please fill all required fields.');
      return;
    }
  
    // Retrieve startDate and endDate from the form
    const startDate = new Date(this.frmHoliday.value.startDate);
    const endDate = new Date(this.frmHoliday.value.endDate);
  
    // Validate HolidayDates
    const invalidHolidayDates = this.HolidayDetails.controls.some((holidayGroup) => {
      const holidayDate = new Date(holidayGroup.value.holidayDate);
      return holidayDate < startDate || holidayDate > endDate;
    });

    if (invalidHolidayDates) {
      this.notificationService.error('Holiday Date must be between Start Date and End Date.');
      return;
    }
  
    // Transform data for saving
    const formData = this.transformData(this.frmHoliday.value);
  
    if (this.isEditMode) {
      this.updateHoliday(formData);
    } else {
      this.createHoliday(formData);
    }
  }
  
//   removeHolidayDetail(index: number) {
//     if (this.HolidayDetails.length > 1) {
//         this.HolidayDetails.removeAt(index);
//     } else {
//         this.notificationService.error('At least one holiday detail is required.');
//     }
// }

  private createHoliday(formData: any) {
    this.holidayService.addHoliday(formData).subscribe(
      () => {
        this.notificationService.success('Holiday added successfully.');
        this.cancel();
      },
      (error) => {
        if (error.status === 400 && error.error?.message) {
          this.notificationService.error(error.error.message);
        } else {
          this.notificationService.error('Error adding holiday: ' + error.message);
        }
      }
    );
  }

  private updateHoliday(formData: any) {
    this.holidayService.updateHoliday(formData).subscribe(
      () => {
        this.notificationService.success('Holiday updated successfully.');
        this.cancel();
      },
      (error) => {
        this.notificationService.error('Error updating holiday: ' + error.message);
      }
    );
  }

  transformData(data: any) {
    function formatToDateTime(dateStr) {
      const date = new Date(dateStr);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string provided");
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0'); 
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return {
      id: this.isEditMode ? this.holidayId : 0,
      startDate: formatToDateTime(data.startDate),
      endDate: formatToDateTime(data.endDate),
      calendarName: data.calendarName,
      type: data.type,
      plantIdList: data.plantId,
      plantId: Array.isArray(this.frmHoliday.value.plantId)
        ? this.frmHoliday.value.plantId.join(',')
        : this.frmHoliday.value.plantId,
      holidayDetails: data.HolidayDetails.map((detail: any) => ({
        holidayName: detail.holidayName,
        holidayDate:  formatToDateTime(detail.holidayDate),
        remark: detail.remark
      }))
    };
  }

  cancel() {
    this.router.navigate(this.isEditMode ? ['../..', 'list'] : ['..', 'list'], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
