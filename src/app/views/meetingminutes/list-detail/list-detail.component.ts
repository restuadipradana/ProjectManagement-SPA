import { MeetingHistory } from './../../../_core/_models/meeting-history';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Meeting } from '../../../_core/_models/meeting';
import { MeetingDetail } from '../../../_core/_models/meeting-detail';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { SearchCriteriaDT } from '../../../_core/_models/dtModels/datatable';
import { Subject, Observable, Subscription } from 'rxjs';
import { MeetingService } from '../../../_core/_services/meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
//import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorData = '<p>Hello, world!</p>';

  @ViewChild('addModal') public addModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('historyModal') public historyModal: ModalDirective;

  idmm_src: string;
  meetingDetailList: MeetingDetail[];
  meeting: Meeting;
  selectedDetail: MeetingDetail;
  detailStore: any = {};
  alertsDismiss: any = [];
  historyList: MeetingHistory[];
  historyStore: any = {};
  itemno: string = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };

  constructor(private _meetingSvc: MeetingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._meetingSvc.currFuncMGUid.subscribe(
      (d) => (this.idmm_src = d)
    );
    this.idmm_src = this.route.snapshot.params['guid'];
    this.getMeeting(this.idmm_src);
    this.searchCriteria.filter = this.idmm_src; //hehe cari by guid
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
    this.searchCriteria.filter = this.idmm_src;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  // 1 edit 2 delete 3 list histroy
  clickRow(dataclicked: MeetingDetail, kind: number){
    if (kind == 1) {
      this.editOpen(dataclicked);
    }
    else if ( kind == 2) {
      this.detailStore = {};
      this.detailStore = Object.assign({}, dataclicked);
      this.deleteModal.show();
    }
    else if (kind == 3) {
      this.itemno = dataclicked.itemNo;
      this.openHistory(dataclicked.id);
    }
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

  addOpen() {
    this.detailStore =  {};
    Object.assign(this.detailStore, {})
    this.detailStore.description = '<p></p>'; //reset ckeditor
    console.log("addopen", this.detailStore)
    this.addModal.show();
  }

  editOpen(data: MeetingDetail) {
    this.detailStore = {};
    this.detailStore = Object.assign({}, data);
    this.detailStore.crd = this.detailStore.crd === null ? "" : this.detailStore.crd.split('T')[0];
    this.detailStore.firstEstFinish = this.detailStore.firstEstFinish === null ? "" : this.detailStore.firstEstFinish.split('T')[0];
    this.detailStore.latestEstFinish = this.detailStore.latestEstFinish === null  ? "" : this.detailStore.latestEstFinish.split('T')[0];
    this.detailStore.description = this.detailStore.description.replace(/(?:\r\n|\r|\n)/g, '<br>');  //replace new line to <br>
    console.log("editopen", this.detailStore);
    this.editModal.show();
  }

  // 1 add, 2 edit
  save(flag: number) {
    //this.detailStore.crd = new Date (this.detailStore.crd);
    console.log(this.detailStore);
    //this.detailStore = {};
    if (flag == 1){
      this._meetingSvc.addDetail(this.idmm_src, this.detailStore)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload(null, false);
        })
        this.addModal.hide();
        this.showNotif("Success add", "success");
      }, (error) => {
        this.addModal.hide();
        this.showNotif(error.error, "warning");
      });
    }
    else if (flag == 2) {
      this._meetingSvc.editDetail(this.detailStore)
      .subscribe(() => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload(null, false);
        })
        this.editModal.hide();
        this.showNotif("Success edit", "success");
      }, (error) => {
        this.editModal.hide();
        this.showNotif(error.error, "warning");
      });
    }
  }

  deleteDetail() {
    this._meetingSvc.deleteDetail(this.detailStore).subscribe(() => {
      this.deleteModal.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    }, error => {
      console.log(error.error);
      this.deleteModal.hide();
      this.showNotif(error.error, "warning");
    });
    this.detailStore =  {};
    Object.assign(this.detailStore, {}) //reset value after delete
  }

  showNotif(message: any, typ: string) {
    this.alertsDismiss.push({
      type: typ,
      msg: message,
      timeout: 3000
    });
  }

  openHistory(id_mmd: string) {
    this.historyList = [];
    this._meetingSvc.getHistoryList(id_mmd).subscribe(
      (res: any) => {
        this.historyList = res;
        this.historyModal.show();
        //console.log(this.historyList);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showNotif(error.error, "warning");
      }
    );
  }




}
