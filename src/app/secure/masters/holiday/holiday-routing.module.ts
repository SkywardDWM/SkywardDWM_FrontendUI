import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPage, PageAuthGuard, PermissionType } from '@app-core';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { HolidayComponent } from './holiday.component';
import { HolidayListComponent } from './list/list.component';
import { HolidayAddEditComponent } from './add-edit/add-edit.component';
import { HolidaySearchPanelComponent } from './search-panel/search-panel.component';

//routes
const routes: Routes = [
    {
        path: '',
        component: HolidayComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: HolidayListComponent,
                canActivate: [PermissionGuard],
                data: { permission: 'Holiday (PER_HOLIDAY) - View' },
            },
            {
                path: 'add',
                canActivate: [PermissionGuard],
                data: { permission: 'Holiday (PER_HOLIDAY) - Add' },
                component: HolidayAddEditComponent
            },
            {
                path: 'edit/:id',
                canActivate: [PermissionGuard],
                data: { permission: 'Holiday (PER_HOLIDAY) - Edit' },
                component: HolidayAddEditComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HolidayRoutingModule { }


export const HolidayComponents = [
    HolidayComponent,
    HolidayListComponent, HolidayAddEditComponent,
    HolidaySearchPanelComponent
]; 