import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SupportService } from './../../_core/_services/support.service';
import { FormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { WeekRangeComponent } from './week-range/week-range.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [WeekRangeComponent, UsersComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class SettingsModule { }
