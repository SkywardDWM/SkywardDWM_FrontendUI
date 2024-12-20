import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPage, PageAuthGuard, PermissionType } from '@app-core';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { TaskComponent } from './task.component';
import { TaskListComponent } from './list/list.component';


//routes
const routes: Routes = [
    {
        path: '',
        component: TaskComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: TaskListComponent,
                canActivate: [PermissionGuard],
                data: { permission: 'Role (PER_ROLE) - View' },
            },
            {
                path: 'list/:id',
                canActivate: [PermissionGuard],
                data: { permission: 'Role (PER_ROLE) - View' },
                component: TaskListComponent
            },
            // {
            //     path: 'edit/:id',
            //     canActivate: [PermissionGuard],
            //     data: { permission: 'Holiday (PER_HOLIDAY) - Edit' },
            //     component: HolidayAddEditComponent
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }


export const TaskComponents = [
    TaskComponent,
     TaskListComponent//, HolidayAddEditComponent,
    // HolidaySearchPanelComponent
]; 