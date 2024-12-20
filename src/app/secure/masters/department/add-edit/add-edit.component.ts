import { Component, OnDestroy, OnInit } from '@angular/core';
import { Department } from 'src/app/model/department';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApplicationPage, CommonUtility } from '@app-core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../department.service';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
    templateUrl: './add-edit.component.html',
    styleUrl: './add-edit.component.scss'
})
export class DepartmentAddEditComponent implements OnInit, OnDestroy {
    DepartmentData: Department;
    departmentId: number;
    isEditMode: boolean;
    frmDepartment: UntypedFormGroup;
    routerSub: Subscription;
    isFormSubmitted: boolean;
    page: string = ApplicationPage.department;
    error: string;
    plantsList: any[] = [];
    usersList: any[] = [];
    IsViewPermission: boolean = false;
    permissionId: number;
    PermissionData: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private departmentService: DepartmentService,
        private notificationService: ToastrService,
        private permissionService: PermissionService
    ) {
        this.createForm();
    }
    private loadDropdowns() {
        this.departmentService.getPlantsList()
            .subscribe((result: any) => {
                this.plantsList = result;
            });

        this.departmentService.getUserList()
            .subscribe((result: any) => {
                this.usersList = result;
            });
    }

    ngOnInit(): void {
        this.getDepartmentRoute();
        this.loadDropdowns();
        this.IsViewPermission = this.permissionService.hasPermission('Department (PER_DEPARTMENT) - View');
    }

    private getDepartmentRoute() {
        this.routerSub = this.activatedRoute.params.subscribe((params) => {
            this.isEditMode = !CommonUtility.isEmpty(params["id"]);
            this.createForm();
            if (this.isEditMode) {
                this.departmentId = params.id;
                this.getDepartmentDetailsById();
            }
        });
    }

    private getDepartmentDetailsById() {
        this.departmentService.getDepartmentById(this.departmentId)
            .subscribe((result: any) => {
                this.DepartmentData = result;
                this.setDepartmentData();
            },
                (error) => {
                    console.error(error);
                    this.notificationService.error("Error fetching role details: " + error.message);
                });
    }

    private setDepartmentData() {
        this.frmDepartment.patchValue({
            departmentName: this.DepartmentData.departmentName,
            hodUserID: this.DepartmentData.hodUserID,
            alias: this.DepartmentData.alias,
            plantId: this.DepartmentData.plantId,
        });
        setTimeout(() => {
        }, 500);
    }

    createForm() {
        this.frmDepartment = this.formBuilder.group({
            departmentName: ['', [Validators.required, Validators.maxLength(100)]],
            hodUserID: ['', [Validators.required]],
            alias: [''],
            plantId: ['', [Validators.required]],
          });
    }

    createDepartment() {
        const department: Department = this.frmDepartment.value;
        const payload = {
            id: 0, // or an appropriate value if updating
            departmentName: department.departmentName,
            hodUserID: department.hodUserID,
            alias: department.alias,
            plantId: department.plantId
        };

        this.departmentService.addDepartment(payload).subscribe(
            () => {
                this.cancel();
                this.notificationService.success("Department created successfully.");
            },
            (error) => {
                this.error = error;
                this.notificationService.error("Error creating Department: " + error.message);
            }
        );
    }

    private updateDepartment() {
        const department: Department = this.frmDepartment.value;

        const payload: Department = {
            ...this.DepartmentData,
            departmentName: department.departmentName,
            hodUserID: department.hodUserID,
            alias: department.alias,
            plantId: department.plantId

        };

        this.departmentService.updateDepartment(payload).subscribe(
            () => {
                this.cancel();
                this.notificationService.success("Department updated successfully.");
            },
            (error) => {
                this.error = error;
                this.notificationService.error("Error updating department: " + error.message);
            }
        );
    }

    save() {
        this.isFormSubmitted = true;
        if (this.frmDepartment.invalid) {
            this.notificationService.error("Please fill all required fields.");
            return;
        }

        if (this.isEditMode) {
            this.updateDepartment();
        } else {
            this.createDepartment();
        }
    }

    cancel() {
        if (this.isEditMode) {
            this.router.navigate(['../..', 'list'], { relativeTo: this.activatedRoute });
        } else {
            this.router.navigate(['..', 'list'], { relativeTo: this.activatedRoute });
        }
    }

    ngOnDestroy(): void {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }
}
