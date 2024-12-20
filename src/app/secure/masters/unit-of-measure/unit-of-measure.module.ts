import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app-shared';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { UnitOfMeasureComponents, UnitOfMeasureRoutingModule } from './unit-of-measure-routing.module';
import { UnitOfMeasureService } from './unit-of-measure.service';

@NgModule({
  declarations: [
    [...UnitOfMeasureComponents] // Add the components for filling line
  ],
  imports: [
    CommonModule,
    UnitOfMeasureRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule // Import timepicker module if needed for the filling line
  ],
  providers: [
    UnitOfMeasureService, // Provide the service for filling line
    provideEnvironmentNgxMask() // Keep this if ngx-mask is used
  ]
})
export class UnitOfMeasureMasterModule { }

