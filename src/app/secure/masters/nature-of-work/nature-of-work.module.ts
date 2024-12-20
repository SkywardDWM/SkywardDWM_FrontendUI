import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app-shared';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NatureOfWorkComponents, NatureOfWorkRoutingModule } from './nature-of-work-routing.module';
import { NatureOfWorkService } from './nature-of-work.service';

@NgModule({
  declarations: [
    [...NatureOfWorkComponents] // Add the components for filling line
  ],
  imports: [
    CommonModule,
    NatureOfWorkRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule // Import timepicker module if needed for the filling line
  ],
  providers: [
    NatureOfWorkService, // Provide the service for filling line
    provideEnvironmentNgxMask() // Keep this if ngx-mask is used
  ]
})
export class NatureOfWorkModule { }

