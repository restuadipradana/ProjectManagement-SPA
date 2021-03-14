import { UsersComponent } from './users/users.component';
import { WeekRangeComponent } from './week-range/week-range.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: 'week-range',
        component: WeekRangeComponent,
        data: {
          title: 'Week Range Set Up'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'List User'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
