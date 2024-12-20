import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  DragDroplistComponent } from './list/list.component';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TaskListComponent } from '../task/list/list.component';
import { KanbanSearchPanelComponent } from './search-panel/search-panel.component';

const routes: Routes = [
  {
      path: '',
      component: DragDropComponent,
      children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
              path: 'list',
              component: DragDroplistComponent,
              canActivate: [PermissionGuard],
              data: { permission: 'Role (PER_ROLE) - View' },
          },
          {
            path: 'task/list/:id', // Add the new route for your target component
            component: TaskListComponent,
            canActivate: [PermissionGuard],
            data: { permission: 'Role (PER_ROLE) - View' },
          },
          // {
          //     path: 'add',
          //     canActivate: [PermissionGuard],
          //     data: { permission: 'Role (PER_ROLE) - Add' },
          //     component: RoleAddEditComponent
          // },
          // {
          //     path: 'edit/:id',
          //     canActivate: [PermissionGuard],
          //     data: { permission: 'Role (PER_ROLE) - Edit' },
          //     component: RoleAddEditComponent
          // },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragDropRoutingModule { }

export const DragDropComponents = [
  DragDropComponent, DragDroplistComponent, KanbanSearchPanelComponent
]; 