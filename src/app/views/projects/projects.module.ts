import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [ProjectListComponent, UploadComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NgSelect2Module,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule
  ]
})
export class ProjectsModule { }
