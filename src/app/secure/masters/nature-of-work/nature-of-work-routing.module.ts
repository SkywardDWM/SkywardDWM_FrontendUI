import { RouterModule, Routes } from '@angular/router';
import { NatureOfWorkListComponent } from './list/list.component';
import { ApplicationPage, PageAuthGuard } from '@app-core';
import { NatureOfWorkAddEditComponent } from './add-edit/add-edit.component';
// import { WeightCheckSearchPanelComponent } from './search-panel/search-panel.component';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { NgModule } from '@angular/core';
import { NatureOfWorkComponent } from './nature-of-work/nature-of-work.component';
import { NatureOfWorkSearchPanelComponent } from './search-panel/search-panel.component';


const routes: Routes = [
  {
    path: '',
    component: NatureOfWorkComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: NatureOfWorkListComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'NatureOfWork (PER_NATURE_OF_WORK) - View' }
      },
      {
        path: 'add',
        canActivate: [PermissionGuard],
        data: { permission: 'NatureOfWork (PER_NATURE_OF_WORK) - Add' },
        component: NatureOfWorkAddEditComponent
      },
      {
        path: 'edit/:id',
        canActivate: [PermissionGuard],
        data: { permission: 'NatureOfWork (PER_NATURE_OF_WORK) - Edit' },
        component: NatureOfWorkAddEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NatureOfWorkRoutingModule { }

export const NatureOfWorkComponents = [
  NatureOfWorkAddEditComponent, NatureOfWorkComponent,
  NatureOfWorkListComponent, NatureOfWorkSearchPanelComponent

];
// WeightCheckSearchPanelComponent
