import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadReportRoutingModule } from './download-report-routing.module';
import { DownloadReportComponent } from './download-report.component';


@NgModule({
  declarations: [DownloadReportComponent],
  imports: [
    CommonModule,
    DownloadReportRoutingModule
  ]
})
export class DownloadReportModule { }
