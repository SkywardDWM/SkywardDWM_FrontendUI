import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService, AccountService, CommonUtility, APIConstant, PermissionType, ApplicationPage } from '@app-core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { PublicService } from 'src/app/public/public.service';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['header-bar.component.scss']
})

export class HeaderBarComponent implements OnInit, OnDestroy {
    basePath: string = APIConstant.basePath;
    userName: string = '';
    imagePath: string = 'assets/images/CompnayLogo1.jpg';
    


    isWeightCheckPermission: boolean = false;
    TrailerLoadingPermission: boolean = false;
    PalletPackingPermission: boolean = false;
    AttributeCheckPermission: boolean = false;
    TrailerInspectionPermission: boolean = false;
    DowntimeTrackingPermission: boolean = false;
    LiquidPreaprationPermission: boolean = false;
    PostCheckPermission: boolean = false;
    PrecheckPermission: boolean = false;
    ProductionOrderPermission: boolean = false;
    UserPermission: boolean = false;
    RolePermission: boolean = false;
    DepartmentPermission: boolean = false;
    HolidayPermission: boolean = false;
    PlantPermission: boolean = false;
    FrequencyPermission: boolean = false;
    UnitOfMeasurePermission: boolean = false;
    NatureOfWorkPermission: boolean = false;
    ActivityPermission : boolean = false;
    KanbanPermission : boolean = false;

    constructor(private router: Router, private accountService: AccountService,
        private userAuthService: UserAuthService, private appService: AppService,
        private publicService: PublicService,
        private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.userName = localStorage.getItem('Name');
        this.checkPermission();
        //  this.getUser();
    }

    checkPermission() {
        this.ProductionOrderPermission = this.permissionService.hasPermission('Production Order (PER_PURCHASEORDER) - View');
        this.UserPermission = this.permissionService.hasPermission('User (PER_USER) - View');
        this.RolePermission = this.permissionService.hasPermission('Role (PER_ROLE) - View');
        this.PlantPermission = this.permissionService.hasPermission('Plant (PER_PLANT) - View');
        this.FrequencyPermission = this.permissionService.hasPermission('Frequency (PER_FREQUENCY) - View');
        this.UnitOfMeasurePermission = this.permissionService.hasPermission('UnitOfMeasure (PER_UNIT_OF_MEASURE) - View');
        this.NatureOfWorkPermission = this.permissionService.hasPermission('NatureOfWork (PER_NATURE_OF_WORK) - View');
        this.isWeightCheckPermission = this.permissionService.hasPermission('Weight Check (PER_WEIGHTCHECK) - View');
        this.TrailerLoadingPermission  = this.permissionService.hasPermission('Trailer Loading (PER_TRAILERLOADING) - View');
        this.PalletPackingPermission   = this.permissionService.hasPermission('Pallet Packing (PER_PALLETPACKING) - View');
        this.AttributeCheckPermission   = this.permissionService.hasPermission('Attribute Check (PER_ATTRIBUTECHECK) - View');
        this.TrailerInspectionPermission   = this.permissionService.hasPermission('Trailer Inspection (PER_TRAILERINSPECTION) - View');
        this.DowntimeTrackingPermission   = this.permissionService.hasPermission('DownTime Tracking (PER_DOWNTIMECHECKING) - View');
        this.LiquidPreaprationPermission   = this.permissionService.hasPermission('Liquid Preparation (PER_LIQUIDPREPARATION) - View');
        this.PostCheckPermission   = this.permissionService.hasPermission('PostCheck List (PER_POSTCHEKLIST) - View');
        this.PrecheckPermission   = this.permissionService.hasPermission('PreCheck List (PER_PRECHEKLIST) - View');
        this.DepartmentPermission   = this.permissionService.hasPermission('Department (PER_DEPARTMENT) - View');
        this.HolidayPermission   = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - View');
        this.ActivityPermission   = this.permissionService.hasPermission('Activity (PER_ACTIVITY) - View');
        this.KanbanPermission   = this.permissionService.hasPermission('Kanban (PER_KANBAN) - View');
    }

    hasPermission(permission: string): boolean {
        return this.permissionService.hasPermission(permission);
    }

    private getUser() {
        const user: any = this.userAuthService.getUser();
        if (user) {
            this.userName = (CommonUtility.isNotEmpty(user.userName) ? user.userName : '');
            // (CommonUtility.isNotEmpty(user.firstName) ? user.firstName : '') + ' '
            //     + (CommonUtility.isNotEmpty(user.lastName) ? user.lastName : '');
        }
    }

    changePassword() {
        this.router.navigate(['/secure/masters/change-password']);
    }

    changeCredential() {
        this.router.navigate(['/secure/masters/change-credential']);
    }

    profile() {
        this.router.navigate(['/secure/user-profile']);
    }

    ngOnDestroy(): void {
    }
}