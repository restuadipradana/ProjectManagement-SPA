import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { ListProjectComponent } from './list-project/list-project.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { DataTablesModule } from "angular-datatables";
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [ListProjectComponent, WeeklyComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule,
    TabsModule
  ]
})
export class OverviewModule { }
