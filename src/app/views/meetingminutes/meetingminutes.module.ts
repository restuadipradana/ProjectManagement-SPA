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

@NgModule({
  declarations: [ListMeetingsComponent, MUploadComponent, ListDetailComponent],
  imports: [
    CommonModule,
    MeetingminutesRoutingModule,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    DataTablesModule
  ]
})
export class MeetingminutesModule { }
