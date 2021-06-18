import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MeetingminutesRoutingModule } from './meetingminutes-routing.module';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { MUploadComponent } from './m-upload/m-upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListMeetingsComponent, MUploadComponent],
  imports: [
    CommonModule,
    MeetingminutesRoutingModule,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule
  ]
})
export class MeetingminutesModule { }
