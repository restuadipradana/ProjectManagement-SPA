import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgSelect2Module } from 'ng-select2';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    NgSelect2Module,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule
  ]
})
export class UploadModule { }
