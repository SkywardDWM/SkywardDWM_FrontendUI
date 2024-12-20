import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RoleComponent } from './role.component';
// import { RoleAddEditComponent } from './add-edit/add-edit.component';
// import { RoleListComponent } from './list/list.component';
// import { RoleSearchPanelComponent } from './search-panel/search-panel.component';
import { ApplicationPage, PageAuthGuard, PermissionType } from '@app-core';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './list/list.component';
import { DepartmentAddEditComponent } from './add-edit/add-edit.component';
import { DepartmentSearchPanelComponent } from './search-panel/search-panel.component';

//routes
const routes: Routes = [
    {
        path: '',
        component: DepartmentComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: DepartmentListComponent,
                canActivate: [PermissionGuard],
                data: { permission: 'Department (PER_DEPARTMENT) - View' },
            },
            {
                path: 'add',
                canActivate: [PermissionGuard],
                data: { permission: 'Department (PER_DEPARTMENT) - Add' },
                component: DepartmentAddEditComponent
            },
            {
                path: 'edit/:id',
                canActivate: [PermissionGuard],
                data: { permission: 'Department (PER_DEPARTMENT) - Edit' },
                component: DepartmentAddEditComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentRoutingModule { }


export const DepartmentComponents = [
    DepartmentComponent,
    DepartmentListComponent, DepartmentAddEditComponent,
    DepartmentSearchPanelComponent
]; 