import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropComponents, DragDropRoutingModule } from './drag-drop-routing.module';
import { SharedModule } from '@app-shared';
import { DragdropService } from './dragdrop.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    [...DragDropComponents]
],
  imports: [
    CommonModule,
    DragDropRoutingModule,
    SharedModule,
    DragDropModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    DragdropService,
      provideEnvironmentNgxMask(),
  ]
})
export class KanbanDragDropModule { }
