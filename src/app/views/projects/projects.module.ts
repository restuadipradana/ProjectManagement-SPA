import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { UploadComponent } from './upload/upload.component';
import { ReportComponent } from './report/report.component';
import { WeeklyComponent } from './weekly/weekly.component';


@NgModule({
  declarations: [ProjectListComponent, UploadComponent, ReportComponent, WeeklyComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NgSelect2Module,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    DataTablesModule,
    TabsModule
  ]
})
export class ProjectsModule { }
