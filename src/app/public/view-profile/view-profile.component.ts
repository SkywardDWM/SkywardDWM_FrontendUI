import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, CommonUtility, ListService, PermissionType, UserAuthService } from '@app-core';
import { List, Role, User } from '@app-models';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Plant } from 'src/app/model/plant';
import { PermissionService } from 'src/app/secure/masters/permission/permission.service';
import { RoleService } from 'src/app/secure/masters/role/role.service';
import { UserService } from 'src/app/secure/masters/user/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {

  userData: User;
  userId: number;
  name: string;
  selectedShift: string = 'General Shift'; // Default value
  roleData: Role[] = [];
  plantData: Plant[] = [];
  departmentData: any[] = [];
  //plantData: any[] = [];  // List of all plants
  selectedPlantIds: number[] = []; // Array to store selected plant IDs
  isDisabled: boolean = false;
  jobRole: any;
  workArea: any;
  reportingManager: string;
  loading: boolean = true;  
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private notificationService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails();

  }

  private fetchUserDetails() {
    try {
      this.loading = true;  
      // Get user from auth service
      const authUser = this.userAuthService.getUser();
      if (authUser && authUser.id) {
        this.userId = authUser.id;
        this.name = authUser.name;

        // Fetch detailed user information
        this.userService.getById(this.userId)
          .subscribe(
            (result: User) => {
              this.userData = result;
              this.jobRole = this.userData.jobRole || 'Not Specified';
              this.workArea = this.userData.workArea || 'Not Specified';
              this.reportingManager = this.userData.reportsTo?.[0]?.reportToName || 'Not Specified';
              this.selectedShift = this.userData.shift || 'General Shift';  // Set selected shift from the user data


              // Fetch additional details
              this.fetchUserRoles();
              this.fetchPlantData();
              this.fetchDepartmentData();
            },
            (error) => {
              console.error('Failed to fetch user details', error);
              this.notificationService.error('Failed to load user profile');
              this.loading = false; 
            }
          );
      } else {
        this.notificationService.error('User not found');
        this.router.navigate(['/public/login']);
        this.loading = false; 
      }
    } catch (error) {
      console.error('Error in fetching user details', error);
      this.notificationService.error('An unexpected error occurred');
      this.router.navigate(['/public/login']);
      this.loading = false; 
    }
  
  }

  private fetchUserRoles() {
    this.userService.getRoles(this.userId)
      .subscribe(
        (roles: string[]) => {
          // If roles are returned as array of strings, map them to role objects
          this.userData.roles = roles.map(roleName => ({
            roleId: 0,
            roleName: roleName,
            code: roleName
          }));
        },
        (error) => {
          console.error('Failed to fetch user roles', error);
        }
      );
  }

  private fetchPlantData() {
    this.userService.getPlantList().subscribe(
      (result) => {
        this.plantData = result as any[];

        const selectedPlant = this.plantData.find(plant => plant.id === this.userData.plantId);
        if (!selectedPlant) {
          this.userData.plantId = null;
        }
      },
      (error) => {
        console.error("Error fetching plant data", error);
      }
    );
   
  }


  private fetchDepartmentData() {
    this.userService.getDepartmentList()
      .subscribe((result: any) => {
        console.log("department list ", result);
        this.departmentData = result;

        const selectedDepartment = this.departmentData.find(
          (department) => department.id === this.userData.departmentId
        );

        if (!selectedDepartment) {
          this.userData.departmentId = null;
        }
      },
        (error) => {
          console.log(error);
        });
  }

  get roleNames(): string {
    return this.userData?.roles?.map(r => r.roleName).join(', ') || 'No Role Assigned';
  }

  goBack() {
    this.router.navigate(['/secure/dashboard']); // Adjust route as needed
  }
  save() {
    const updatedUser: User = {
      ...this.userData,
      shift: this.selectedShift, // Add the selected shift to the user data
    };
    if (this.userData.id) {
      this.userService.update(this.userData.id, updatedUser).subscribe(
        (result: User) => {
          this.notificationService.success('User profile updated successfully');
        //  this.router.navigate(['/secure/dashboard']); // Redirect or update as necessary
        },
        (error) => {
          console.error('Failed to update user data', error);
          this.notificationService.error('Failed to update user profile');
        }
      );
    } else {
      this.userService.add(updatedUser).subscribe(
        (result: User) => {
          this.notificationService.success('User profile added successfully');
          //this.router.navigate(['/secure/dashboard']); // Redirect or update as necessary
        },
        (error) => {
          console.error('Failed to add user data', error);
          this.notificationService.error('Failed to add user profile');
        }
      );
    }
  }


}
