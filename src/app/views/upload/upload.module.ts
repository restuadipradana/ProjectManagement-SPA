import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
//import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class UploadModule { }
