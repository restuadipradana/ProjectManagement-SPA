import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting } from '../../../_core/_models/meeting';
import { MeetingDetail } from '../../../_core/_models/meeting-detail';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { SearchCriteriaDT } from '../../../_core/_models/dtModels/datatable';
import { Subject, Observable, Subscription } from 'rxjs';
import { MeetingService } from '../../../_core/_services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  @ViewChild('editModal') public addModal: ModalDirective;
  @ViewChild('addModal') public editModal: ModalDirective;

  searchtxt: string;
  meetingDetailList: MeetingDetail[];
  meeting: Meeting;
  selectedDetail: MeetingDetail;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };

  constructor(private _meetingSvc: MeetingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._meetingSvc.currFuncMGUid.subscribe(
      (d) => (this.searchtxt = d)
    );
    this.searchtxt = this.route.snapshot.params['guid'];
    this.getMeeting(this.searchtxt);
    this.searchCriteria.filter = this.searchtxt;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
        this._meetingSvc.meetingDetailList(dataTablesParameters)
          .subscribe(resp => {
            this.meetingDetailList = resp.data;
            console.log(this.meetingDetailList);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'action', 'orderable': false },
        { data: 'itemNo', 'orderable': true },
        { data: 'description', 'orderable': true },
        { data: 'caseKind', 'orderable': false },
        { data: 'userPIC', 'orderable': false },
        { data: 'itpic', 'orderable': false },
        { data: 'crd', 'orderable': false },
        { data: 'firstEstFinish', 'orderable': false },
        { data: 'latestEstFinish', 'orderable': false },
        { data: 'remark', 'orderable': false },
        { data: 'status', 'orderable': false },
        { data: 'statusDesc', 'orderable': false },
        { data: 'revision', 'orderable': false },
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

  clickRow(dataclicked: MeetingDetail){
    console.log(dataclicked);
  }

  getMeeting(id: string){
    this._meetingSvc.getMeeting(id).subscribe(
      (res: any) => {
        this.meeting = res;
        console.log(this.meeting);
      },
      (error) => {
        console.log("Error: " , error.error.text);
      }
    );
  }


}
