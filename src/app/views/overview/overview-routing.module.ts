import { WeeklyComponent } from './weekly/weekly.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Overview'
    },
    children: [
      {
        path: 'list-project',
        component: ListProjectComponent,
        data: {
          title: 'List Project'
        }
      },
      {
        path: 'weekly',
        component: WeeklyComponent,
        data: {
          title: 'Project by Weekly'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
