import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart'

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportsRoutingModule,
    ChartModule
  ],
  exports:[

  ]
})
export class ReportsModule { }
