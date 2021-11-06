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
  meetingStore: any = {};
  alertsDismiss: any = [];

  @ViewChild('addModal') public addModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '', filter4: ''  };

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
    this.searchCriteria.filter = '';
    this.searchCriteria.filter2 = '';
    this.searchCriteria.filter3 = '';
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // 1 open detail, 2 open dialog delete, 3 export excel
  clickRow(dataclicked: Meeting, kind: number){
    console.log(dataclicked);
    this.meetingStore = {};
    this.meetingStore = Object.assign({}, dataclicked); //stroe dataclicekd to meetingstore
    //this._meetingSvc.chgFuncMGuid(dataclicked.id); //deprecated
    //this.router.navigate(['/meeting-minutes/list-detail']);
    if (kind == 1) {
      this.router.navigate(['/meeting-minutes/list-detail/'+dataclicked.id]);
    }
    else if (kind == 2) {
      this.deleteModal.show();
    }
    else if (kind == 3) {
      this.exportExcel(dataclicked);
    }
  }

  addOpen() {
    this.meetingStore = {};
    Object.assign(this.meetingStore, {}) //reset value before add
    this.addModal.show();
  }

  save() {
    console.log(this.meetingStore);
    this._meetingSvc.addMeeting(this.meetingStore).subscribe(
      () => {
        this.addModal.hide();
        this.showNotif("Success to Add", "success");
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload(null, false);
        });
      },
      (error) => {
        this.addModal.hide();
        console.log(error);
        this.showNotif(error.error, "warning");
      }
    );
  }

  deleteMeeting() {
    this._meetingSvc.deleteMeeting(this.meetingStore).subscribe(() => {
      this.deleteModal.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    }, error => {
      console.log(error.error);
    });
    this.meetingStore =  {};
    Object.assign(this.meetingStore, {}) //reset value after delete
  }

  showNotif(message: any, typ: string) {
    this.alertsDismiss.push({
      type: typ,
      msg: message,
      timeout: 3000
    });
  }

  exportExcel(data: Meeting) {
    this._meetingSvc.exprotExcel(data)
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = 'MeetingMinutes_' + data.mM_Id + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

}
