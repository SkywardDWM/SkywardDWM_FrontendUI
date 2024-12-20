import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from 'node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';
import { List, User } from '@app-models';
import { ApplicationPage, CommonUtility, ListService, PermissionType } from '@app-core';
import { ValidationService } from '@app-shared';
import { UserService } from '../user.service';
import { RoleService } from '../../role/role.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import * as XLSX from 'xlsx';


@Component({
    templateUrl: './add-edit.component.html',
    styleUrl: './add-edit.component.scss'
})

export class UserAddEditComponent implements OnInit, OnDestroy {

    userData: User;
    userId: any;
    isEditMode: boolean;
    frmUser: UntypedFormGroup;
    routerSub: Subscription;
    isFormSubmitted: boolean;
    reportsToData: User[] = [];
    roleData: List[] = [];
    PlantData: any[] = [];
    DepartmentData: any[] = [];
    hidePassword = true;
    hideConfirmPassword = true;
    workingDays: number[] = [5, 6]; // Static values for the dropdown
    error: string;
    page: string = ApplicationPage.user;
    permissions = PermissionType;

    IsViewPermission: boolean = false;
    selectedFile: any;
    isUploading: boolean;

    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private formBuilder: UntypedFormBuilder, private userService: UserService, private roleService: RoleService,
        private notificationService: ToastrService, private listService: ListService,
        private permissionService: PermissionService) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getUserRoute();
        this.getRoleData();
        this.getPlantData();
        this.getDepartmentData();
        this.IsViewPermission = this.permissionService.hasPermission('User (PER_USER) - View');

    }

    private getUserRoute() {
        this.routerSub = this.activatedRoute.params.subscribe((params) => {
            //  console.log("Edit params ", params)
            this.isEditMode = !CommonUtility.isEmpty(params["id"]);
            this.createForm();
            if (this.isEditMode) {
                this.userId = params.id //+params["id"];
                this.getUserDetails();
            }
            else {
                this.userData = new User();
                this.getRoleData();
            }
        });
    }



    private getUserDetails() {
        // console.log("user id ", this.userId)
        this.userService.getById(this.userId)
            .subscribe((result: User) => {
                this.userData = result;
                this.setUserData();
                this.getRoleData();
                this.getUserRoles();

            }, (error) => {
                console.log(error);
            });
    }

    private getUserRoles() {
        this.userService.getRoles(this.userId)
            .subscribe((roles: string[]) => {
                // Assuming roles are returned as an array of strings
                this.frmUser.controls['role'].setValue(roles[0] || ''); // Set the first role or default value
            }, (error) => {
                console.log(error);
            });
    }



    private getRoleData() {
        this.roleService.getRole()
            .subscribe((result: any) => {
                this.roleData = result;
                //  console.log("ROLE:", this.roleData);
               // this.createRolesControl();
            }, (error) => {
                console.log(error);
            });
    }

    private getPlantData(){
        this.userService.getPlantList()
        .subscribe((result: any) => {
          console.log("plant list ", result);
          this.PlantData = result;
        },
          (error) => {
            console.log(error);
          });
    }
  
    private getDepartmentData(){
        this.userService.getDepartmentList()
        .subscribe((result: any) => {
          console.log("department list ", result);
          this.DepartmentData = result;
        },
          (error) => {
            console.log(error);
          });
    }

    private setUserData() {
        this.frmUser.patchValue(this.userData);
        this.frmUser.controls.password.setValue('********');
        this.frmUser.controls.confirmPassword.setValue('********');
    }

    createForm() {
        this.frmUser = this.formBuilder.group({
            userName: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.maxLength(50)]],
            password: [{ value: '', disabled: this.isEditMode }, 
                this.isEditMode 
                ?[]
                : [Validators.required, Validators.min(6), Validators.maxLength(20), ValidationService.passwordValidator]],
            confirmPassword: [{ value: '', disabled: this.isEditMode }, 
                this.isEditMode 
                ? [] // No validators in edit mode
                : [Validators.required, ValidationService.comparePassword]],
            email: ['', [Validators.required, ValidationService.emailValidator, ValidationService.multipleemailrestrictValidator, Validators.maxLength(50)]],
            phoneNumber: ['', [Validators.maxLength(10)]],
            role: ['', [Validators.required]],
            name: ['', [Validators.required]],
            adId: ['', [Validators.required]],
            groupID: ['', ''],
            plantId: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            jobRole: ['', ''],
            workArea: ['', ''],
            reportingManager: ['', ''],
            workingDays: ['','']
        
            // reportsTo: new UntypedFormArray([], ValidationService.minSelectedCheckboxes(0)),
            // roles: new UntypedFormArray([], ValidationService.minSelectedCheckboxes(1)),
             // firstName: ['', [Validators.required, Validators.maxLength(50)]],
            // lastName: ['', [Validators.required, Validators.maxLength(50)]],
        });
    }

    private createUser() {
        let user: User = Object.assign({}, this.frmUser.value);

        this.userService.add(user).subscribe(
            (result: any) => {
                if (result) {
                    this.userId = result.id; // Assign the userId from the response

                    // Now assign the role after getting the userId
                    const selectedRole = this.frmUser.get('role').value;
                    if (selectedRole) {
                        this.assignRoleToUser(this.userId, selectedRole);
                    }

                    this.notificationService.success("User saved successfully.");
                    this.cancel();
                } else {
                    this.notificationService.warning(result.message);
                }
            },
            (error) => {
                if (error.status === 400) {
                    if (Array.isArray(error.error) && error.error.length > 0) {
                        // Show the first error message from the array
                        const errorMessage = error.error[0].description;
                        this.notificationService.error(errorMessage);
                        //  this.error = error.error.modelState[''][0];
                    }
                } else {
                    this.error = 'Something went wrong';
                }
            }
        );
    }


    private updateUser() {
        let user: User = this.frmUser.value;

        this.userData = Object.assign(this.userData, user);

        this.userService.update(this.userData.id, this.userData)
            .subscribe(
                (result: any) => {
                    this.cancel();
                    // console.log('Update Response:', result);
                    if (result) {

                        // Safely access result.message
                        const errorMessage = result?.message || 'An unexpected error occurred.';
                        this.notificationService.warning(errorMessage);

                    } else {
                        this.notificationService.success("User updated successfully.");
                        this.router.navigate(['../..', 'list'], { relativeTo: this.activatedRoute });
                        this.cancel();

                    }
                },
                (error) => {
                    console.error('Update Error:', error); // Log the error
                    // Handle errors, ensure error.message is safely accessed
                    const errorMessage = error?.error?.modelState?.['']?.[0] || 'Something went wrong';
                    this.error = errorMessage;
                    this.notificationService.error(errorMessage);
                }
            );
    }



    save() {
        this.isFormSubmitted = true;

        if (this.frmUser.invalid) {
            return;
        }

        if (this.isEditMode) {
            this.updateUser(); // Update user
        } else {
            this.createUser(); // Create new user
        }

        // After creating/updating the user, assign the role
        const selectedRole = this.frmUser.get('role').value;
        if (selectedRole) {
            this.handleRoleAssignment(selectedRole);
        }
    }

    private handleRoleAssignment(newRole: string) {
        if (this.isEditMode) {
            this.userService.getRoles(this.userId)
                .subscribe((currentRoles: string[]) => {
                    const oldRole = currentRoles[0]; // Assuming only one role is assigned
                    if (oldRole && oldRole !== newRole) {
                        // Remove the old role
                        this.userService.removeRole(this.userId, oldRole)
                            .subscribe(() => {
                                // Add the new role
                                this.assignRoleToUser(this.userId, newRole);
                            }, (error) => {
                                this.notificationService.error(`Failed to remove old role: ${error.message}`);
                            });
                    } else {
                        // Just add the new role if no old role or same role
                        this.assignRoleToUser(this.userId, newRole);
                    }
                }, (error) => {
                    this.notificationService.error(`Failed to get current roles: ${error.message}`);
                });
        } else {
            // Just assign the new role for new user
            this.assignRoleToUser(this.userId, newRole);
        }
    }

    // Method to assign role to the user
    assignRoleToUser(userId: number, role: string) {
        this.userService.assignRole(userId, role).subscribe(
            (result: any) => {
                this.notificationService.success(`Role '${role}' assigned successfully to user.`);
            },

        );
    }


    setValidators() {
        const rolesList = CommonUtility.getSelectedCheckboxList(this.frmUser.value.roles, this.roleData);

        if (rolesList.some(role => role.name === 'Super Admin')) {
            this.frmUser.controls.parkingAuthorityId.setValidators([]);
        }
        else {
            this.frmUser.controls.parkingAuthorityId.setValidators([Validators.required]);
        }

        this.frmUser.controls.parkingAuthorityId.updateValueAndValidity();
    }

    keyDownHandler(event) {
        if (event.code === 'Space') {
            event.preventDefault();
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
        this.routerSub.unsubscribe();
    }
    
     // Method to handle file selection
onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.selectedFile = file;
        this.parseFile(file);
    }
}

// Parse CSV or Excel File
parseFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert to JSON
        this.processUserData(jsonData);
    };
    reader.readAsArrayBuffer(file);
}

// Process Parsed User Data
processUserData(data: any[]) {
    const rawHeaders = data[0];
    const headers = rawHeaders.map((header: string) => header.trim().toLowerCase()); // Normalize headers
    //console.log('Normalized Headers:', headers);

    const userRecords = data.slice(1);
    userRecords.forEach((record, index) => {
    });

    const processedUsers = userRecords.map((record, recordIndex) => {
        const userObj: any = {};
        headers.forEach((header: string, index: number) => {
            const mappedProperty = this.mapHeaderToProperty(header);
            const value = record[index] || ''; // Default to empty string if undefined
            userObj[mappedProperty] = this.convertDataType(value, mappedProperty);
        });
        return userObj;
    });

    //console.log('Processed Users:', processedUsers);
    this.validateAndPrepareUsers(processedUsers);
}



// Map Excel Headers to Object Properties
mapHeaderToProperty(header: string): string {
    const mappings: { [key: string]: string } = {
        'company': 'plant',
        'designation': 'designation',
        'emp_displayname': 'name',
        'email address': 'email', // Map 'email address' to 'email'
        'mobile number': 'phoneNumber',
        'program': 'program',
        'employeeid': 'empolyeeId',
        'login id': 'userName', // Map 'login id' to 'userName'
        'group id': 'groupID'
    };
    return mappings[header.trim().toLowerCase()] || header.toLowerCase();
}


// Convert Data Types based on Field
convertDataType(value: any, field: string): any {
    switch (field) {
        case 'email':
            return String(value).trim(); // Email should be a string
        case 'designation':
            return String(value).trim(); // Email should be a string
        case 'phoneNumber':
            return String(value).replace(/\D/g, ''); // Phone numbers should be strings with only digits
        case 'userName':
        case 'name':
        case 'plant':
        case 'program':
            return String(value).trim();
        case 'empolyeeId':
            return String(value).trim(); // Return empolyeeId as string
        case 'groupID':
            return String(value).trim(); // These should be strings
        // case 'id':
        //     return Number(value) || null; // Convert to number, handle invalid as null
        default:
            return value; // Default return value as is
    }
}

// Validate and Prepare Users for Upload
validateAndPrepareUsers(users: any[]) {
    const validUsers = users.filter(user => user.userName && user.email); // Ensure userName and email are present
    if (validUsers.length === 0) {
        this.notificationService.error(`Users Already Exists. `);
        return;
    }
    if (confirm(`${validUsers.length} users found. Do you want to import them?`)) {
        this.performBulkUserUpload(validUsers);
    }
}

// Perform Bulk Upload
performBulkUserUpload(users: any[]) {
    this.isUploading = true;
    this.userService.bulkUpload(users).subscribe(
        (response: any) => {
            this.isUploading = false;
            // Check if successCount > 0, which means there are successful users
            if (response.successCount > 0) {
                this.notificationService.success(`${response.successCount} users imported successfully.`);
            } else {
                // If no users were successfully imported, show a warning
                this.notificationService.error('No users were successfully imported.');
            }

            // Navigate to the user list page after upload (whether success or failure)
            this.router.navigate(['..', 'list'], { relativeTo: this.activatedRoute });
        },
        (error) => {
            this.isUploading = false;
            // this.notificationService.error('Bulk upload failed.');
            // console.error('Bulk upload error:', error);
            //     this.notificationService.error('An unexpected error occurred during the upload.');
            if (error.error?.failedUsers && Array.isArray(error.error.failedUsers)) {
                const failedUsers = error.error.failedUsers;
                const failedCount = failedUsers.length;

                // Extract specific error messages
                const errorMessages = failedUsers
                    .map(user => `${user.userName}: ${user.errors.join(', ')}`)
                    .join('\n');
                    
                    window.location.reload();
                // Show toaster notification for failed users
                this.notificationService.error(`${failedCount} users already exists.`);
               
            } else {
                // Generic error message
                this.notificationService.error('An unexpected error occurred during the upload.');
            }
            
        }
        
    );
    //this.router.navigate(['..', 'add'], { relativeTo: this.activatedRoute });
    
}
}