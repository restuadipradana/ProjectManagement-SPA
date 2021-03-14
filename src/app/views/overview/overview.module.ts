import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { ListProjectComponent } from './list-project/list-project.component';
import { WeeklyComponent } from './weekly/weekly.component';

@NgModule({
  declarations: [ListProjectComponent, WeeklyComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
