import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app-shared';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { PlantComponents, PlantRoutingModule } from './plant-routing.module';
import { PlantService } from './plant.service';

@NgModule({
  declarations: [
    [...PlantComponents] // Add the components for filling line
  ],
  imports: [
    CommonModule,
    PlantRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule // Import timepicker module if needed for the filling line
  ],
  providers: [
    PlantService, // Provide the service for filling line
    provideEnvironmentNgxMask() // Keep this if ngx-mask is used
  ]
})
export class PlantMasterModule { }

