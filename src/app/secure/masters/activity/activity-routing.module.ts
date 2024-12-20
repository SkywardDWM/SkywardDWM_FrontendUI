import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "src/app/core/guards/permission-guard.service";
import { NgModule } from "@angular/core";
import { ActivityComponent } from "./activity.component";
import { ActivityListComponent } from "./list/list.component";
import { ActivityAddEditComponent } from "./add-edit/add-edit.component";
import { ActivitySearchPanelComponent } from "./search-panel/search-panel.component";

const routes: Routes = [
    {
        path: '',
        component: ActivityComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: ActivityListComponent,
                canActivate: [PermissionGuard],
                data: { permission: 'Activity (PER_ACTIVITY) - View' },
            },
            {
                path: 'add',
                canActivate: [PermissionGuard],
                data: { permission: 'Activity (PER_ACTIVITY) - Add' },
                component: ActivityAddEditComponent
            },
            {
                path: 'edit/:id',
                canActivate: [PermissionGuard],
                data: { permission: 'Activity (PER_ACTIVITY) - Edit' },
                component: ActivityAddEditComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivityRoutingModule { }


export const ActivityComponents = [
    ActivityComponent,
    ActivityListComponent, ActivityAddEditComponent,
    ActivitySearchPanelComponent
]; 