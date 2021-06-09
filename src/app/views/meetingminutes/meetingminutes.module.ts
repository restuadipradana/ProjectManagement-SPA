import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingminutesRoutingModule } from './meetingminutes-routing.module';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';


@NgModule({
  declarations: [ListMeetingsComponent],
  imports: [
    CommonModule,
    MeetingminutesRoutingModule
  ]
})
export class MeetingminutesModule { }
