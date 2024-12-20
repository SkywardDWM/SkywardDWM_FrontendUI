import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app-shared';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { FrequencyComponents, FrequencyRoutingModule } from './frequency-routing.module';
import { FrequencyService } from './frequency.service';

@NgModule({
  declarations: [
    [...FrequencyComponents] // Add the components for filling line
  ],
  imports: [
    CommonModule,
    FrequencyRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule // Import timepicker module if needed for the filling line
  ],
  providers: [
    FrequencyService, // Provide the service for filling line
    provideEnvironmentNgxMask() // Keep this if ngx-mask is used
  ]
})
export class FrequencyMasterModule { }

