import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Meeting Minutes'
    },
    children: [
      {
        path: 'list-meeting',
        component: ListMeetingsComponent,
        data: {
          title: 'List Meetings'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingminutesRoutingModule { }
