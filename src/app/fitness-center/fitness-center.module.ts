import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitnessCenterRoutingModule } from './fitness-center-routing.module';
import { FitnessCenterPageComponent } from './fitness-center-page/fitness-center-page.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FitnessCenterPageComponent],
  imports: [
    CommonModule,
    FitnessCenterRoutingModule,
    UiComponentsModule,
    NgbModule,
    FormsModule,
  ],
})
export class FitnessCenterModule {}
