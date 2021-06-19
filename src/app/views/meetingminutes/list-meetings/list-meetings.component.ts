import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting } from '../../../_core/_models/meeting';
import { MeetingDetail } from '../../../_core/_models/meeting-detail';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { SearchCriteriaDT } from '../../../_core/_models/dtModels/datatable';
import { Subject, Observable, Subscription } from 'rxjs';
import { MeetingService } from '../../../_core/_services/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.scss']
})
export class ListMeetingsComponent implements OnInit {

  searchtxt: string;
  meetingList: Meeting[];
  selectedMeeting: Meeting;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };

  constructor(private _meetingSvc: MeetingService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
        this._meetingSvc.meetingList(dataTablesParameters)
          .subscribe(resp => {
            this.meetingList = resp.data;
            console.log(this.meetingList);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'action', 'orderable': false },
        { data: 'mM_Id', 'orderable': true },
        { data: 'm_Name', 'orderable': true },
        { data: 'm_TimeStart', 'orderable': false },
        { data: 'm_TimeEnd', 'orderable': false },
        { data: 'chairman', 'orderable': false },
        { data: 'recorder', 'orderable': false },
        { data: 'attendees', 'orderable': false },
        { data: 'm_TSubject', 'orderable': false },
        { data: 'createAt', 'orderable': false },
      ],
      order: [1, 'asc'],
      autoWidth: false
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    console.log(1)
  }

  rerender(): void {
    this.searchCriteria.isPageLoad = false;
    this.searchCriteria.filter = this.searchtxt;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  clickRow(dataclicked: Meeting){
    console.log(dataclicked);
    this._meetingSvc.chgFuncMGuid(dataclicked.id);
    //this.router.navigate(['/meeting-minutes/list-detail']);
    this.router.navigate(['/meeting-minutes/list-detail/'+dataclicked.id]);
  }

}
