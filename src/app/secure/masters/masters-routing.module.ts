import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPage, AuthGuard, PageAuthGuard, PermissionType } from '@app-core';
import { ChangeCredentialsComponent } from './change-credentials/change-credentials.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MastersComponent } from './masters.component';

//routes
const routes: Routes = [
    {
        path: '',
        component: MastersComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            {
                path: 'user',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.user, action: PermissionType.list },
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'role',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.role, action: PermissionType.list },
                loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                data: { title: 'Change Password' }
            },
            {
                path: 'change-credential',
                component: ChangeCredentialsComponent,
                data: { title: 'Change Credentials' }
            },
            {
                path: 'company',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.company, action: PermissionType.list },
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
            },
            {
                path: 'permission',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.permissioon },
                loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule)
            },

            {
                path: 'Drag-Drop',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.dragDrop },
                loadChildren: () => import('./drag-drop/drag-drop.module').then(m => m.KanbanDragDropModule)
            },

            {
                path: 'department',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.department },
                loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
            },
            {
                path: 'holiday',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.holiday },
                loadChildren: () => import('./holiday/holiday.module').then(m => m.HolidayModule)
            },
            {
                path: 'Plant',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.plant },
                loadChildren: () => import('./plant/plant.module').then(m => m.PlantMasterModule)
            },

            {
                path: 'Frequency',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.frequency },
                loadChildren: () => import('./frequency/frequency.module').then(m => m.FrequencyMasterModule)
            },

            {
                path: 'unit-of-measure',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.unit_of_measure },
                loadChildren: () => import('./unit-of-measure/unit-of-measure.module').then(m => m.UnitOfMeasureMasterModule)
            },

            {
                path: 'nature-of-work',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.nature_of_work },
                loadChildren: () => import('./nature-of-work/nature-of-work.module').then(m => m.NatureOfWorkModule)
            },
            {
                path: 'task',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.activity },
                loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule)
            },
            {
                path: 'task',
                canActivate: [PageAuthGuard],
                data: { page: ApplicationPage.tasks },
                loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MastersRoutingModule { }

export const MastersComponents = [
    MastersComponent, ChangePasswordComponent, ChangeCredentialsComponent
];