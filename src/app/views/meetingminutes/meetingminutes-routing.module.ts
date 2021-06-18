import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { MUploadComponent } from './m-upload/m-upload.component';

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
      },
      {
        path: 'upload',
        component: MUploadComponent,
        data: {
          title: 'Upload Meeting Minutes'
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
