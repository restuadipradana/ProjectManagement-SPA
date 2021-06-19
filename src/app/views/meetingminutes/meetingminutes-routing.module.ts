import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { MUploadComponent } from './m-upload/m-upload.component';

const routes: Routes = [
  {
    path: '',
    //component: ListMeetingsComponent,
    data: {
      title: ''
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
        path: 'list-detail/:guid',
        component: ListDetailComponent,
        data: {
          title: 'List Detail'
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
