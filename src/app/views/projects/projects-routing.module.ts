import { ReportComponent } from './report/report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projects'
    },
    children: [
      {
        path: 'list',
        component: ProjectListComponent,
        data: {
          title: 'List Project'
        }
      },
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload Project Data'
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Download Report'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
