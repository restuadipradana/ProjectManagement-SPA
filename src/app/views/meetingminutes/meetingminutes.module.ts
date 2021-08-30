import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MeetingminutesRoutingModule } from './meetingminutes-routing.module';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { MUploadComponent } from './m-upload/m-upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from "angular-datatables";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [ListMeetingsComponent, MUploadComponent, ListDetailComponent],
  imports: [
    CommonModule,
    MeetingminutesRoutingModule,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    DataTablesModule,
    CollapseModule.forRoot(),
    NgSelect2Module,
    CKEditorModule
  ]
})
export class MeetingminutesModule { }
