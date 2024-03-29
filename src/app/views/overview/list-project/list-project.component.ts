import { UserList } from './../../../_core/_models/user-list';
import { SupportService } from './../../../_core/_services/support.service';
import { StageList } from './../../../_core/_models/stage-list';
import { OverviewService } from './../../../_core/_services/overview.service';
import { ProjectList } from './../../../_core/_models/project-list';
import { ProjectL1List } from './../../../_core/_models/project-l1-list';
import { SearchCriteriaDT } from './../../../_core/_models/dtModels/datatable';
import { Component, OnInit, ViewChild,  ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit, AfterViewInit {

  @ViewChild('addModal') public addModal: ModalDirective;
  @ViewChild('memo2Modal') public memo2Modal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('projTabs', { static: false }) projTabs: TabsetComponent;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>; //gatau biar bisa rerender multiple table
  //dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '', filter4: ''  };
  searchCriteria2: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx', filter4: ''  };
  searchCriteria3: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx', filter4: ''  };

  tabLevelIdx: number;
  prevPosIdx: number;

  firstActive: boolean = true;
  firstDisabled: boolean = false;

  secondTabTitle: string = "";
  secondActive: boolean = false;
  secondDisabled: boolean = true;

  thirdTabTitle: string = "";
  thirdActive: boolean = false;
  thirdDisabled: boolean = true;

  listProjL1: ProjectL1List[];
  listProjL2: ProjectList[];
  listProjL3: ProjectList[];
  reqformNosrc: string = "";
  reqformDescsrc: string = "";
  stagesrc: string ="";

  modData: ProjectList;
  listStage: StageList[];

  isDisableBtn: boolean;
  alertsDismiss: any = [];
  listUser: UserList[];

  constructor(private _overviewSvc: OverviewService, private _supportSvc: SupportService) { }

  ngOnInit(): void {
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
        console.log("param1: ", dataTablesParameters)
        this._overviewSvc.listProjL1(dataTablesParameters)
          .subscribe(resp => {
            this.listProjL1 = resp.data;
            console.log("resp1: ", resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'system'  },
        { data: 'applicant'  },
        { data: 'pic'  },
        { data: 'requestFormNo' },
        { data: 'requestFormDesc' }
      ],
      order: [3, 'asc'],
      autoWidth: false
    };

    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria2;
        console.log("param2: ", dataTablesParameters)
        this._overviewSvc.listProjL2(dataTablesParameters)
          .subscribe(resp => {
            this.listProjL2 = resp.data;
            console.log("resp2" , resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'action', 'orderable': false },
        { data: 'applicant' , 'orderable': false },
        { data: 'pic' , 'orderable': false },
        { data: 'requestFormNo' , 'orderable': false },
        { data: 'requestFormDesc' , 'orderable': false },
        { data: 'stage' },
        { data: 'userExpectedDate' },
        { data: 'stageEstimateFinish'  },
        { data: 'stageActualFinish' , 'orderable': false },
        { data: 'testDateEstimate' , 'orderable': false },
        { data: 'applyDate' , 'orderable': false },
        { data: 'memo' , 'orderable': false },
        { data: 'week' , 'orderable': false },
        { data: 'createAt' , 'orderable': false }
      ],
      order: [5, 'asc'],
      autoWidth: false,
    };

    this.dtOptions[2] = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria3;
        console.log("param3: ", dataTablesParameters)
        this._overviewSvc.listProjL3(dataTablesParameters)
          .subscribe(resp => {
            this.listProjL3 = resp.data;
            console.log("resp3" , resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'applicant' , 'orderable': false },
        { data: 'pic' , 'orderable': false },
        { data: 'requestFormNo' },
        { data: 'requestFormDesc' , 'orderable': false },
        { data: 'stage' , 'orderable': false },
        { data: 'userExpectedDate' , 'orderable': false },
        { data: 'stageEstimateFinish' , 'orderable': false },
        { data: 'stageActualFinish' , 'orderable': false },
        { data: 'testDateEstimate' , 'orderable': false },
        { data: 'applyDate' , 'orderable': false },
        { data: 'memo' , 'orderable': false },
        { data: 'memo2' , 'orderable': false },
        { data: 'week' , 'orderable': false },
        { data: 'createAt' , 'orderable': false },
        { data: 'createBy' , 'orderable': false }
      ],
      order: [2, 'asc'],
      autoWidth: false,
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    console.log(1)
  }

  rerender(): void {
    this.searchCriteria.isPageLoad = true;
    this.searchCriteria.filter = "";
    this.searchCriteria2.isPageLoad = true;
    this.searchCriteria2.filter = this.reqformNosrc;
    this.searchCriteria2.filter2 = this.reqformDescsrc;
    this.searchCriteria3.filter = this.reqformNosrc;
    this.searchCriteria3.filter2 = this.reqformDescsrc;
    this.searchCriteria3.filter3 = this.stagesrc;

    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    });
  }

  //modal (kind 1 add stage, 2 add memo2)
  openModal(data: ProjectList, kind: number) {
    if (kind == 1) {
      const asm = data;
      //this.modData = data;
      this.modData = Object.assign({}, data);

      this._supportSvc.getStage(data.stage).subscribe(
        (res: any) => {
          this.listStage = res;
        },
        (error) => {
          console.log("Error: " , error.error.text);
        }
      );
      this.getUserList();
      //this.modData.stage = null;
      this.modData.stageActualFinish = null;
      this.modData.stageEstimateFinish = null;
      this.modData.testDateEstimate = null;
      this.modData.userExpectedDate = null;
      this.modData.applyDate = null;

      //this.modData.createBy = null;
      console.log("md ", this.modData);
      this.addModal.show();
    }
    if (kind == 2) {
      this.modData = data;
      this.memo2Modal.show();
    }
    if (kind == 3) {
      this.modData = data;
      this.deleteModal.show();
    }
  }

  hideModal() {
    this.rerender();
    this.addModal.hide();
    this.memo2Modal.hide();
  }

  save(kind: number) {
    //1 add stage, 2 add memo2
    if (kind == 1) {
      console.log("before save", this.modData);
      this._overviewSvc.addStage(this.modData).subscribe(
        (res: any) => {
          console.log(res);
          this.addModal.hide();
          this.rerender();
        },
        (error) => {
          console.log(error);
          this.showNotif("Week not found! cannot save, please generate week first for this year");
        }
      );
    }
    if (kind == 2) {
      this._overviewSvc.addMemo2(this.modData).subscribe(
        (res: any) => {
          console.log(res);
          this.memo2Modal.hide();
          this.rerender();
        },
        (error) => {
          console.log(error.error);
        }
      );
    }
  }

  showNotif(message: any) {
    this.alertsDismiss.push({
      type: 'warning',
      msg: message,
      timeout: 3000
    });
  }

  getUserList(){
    this._supportSvc.getUserList().subscribe(
      (res: any) => {
        this.listUser = res;
        console.log(this.listUser);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showNotif(error.error.text);
      }
    );
  }

  deleteStage(data: ProjectList){
    this._overviewSvc.deleteStage(data).subscribe(
      () => {
        this.deleteModal.hide();
        this.rerender();
      },
      (error) => {
        console.log("Error: " , error.error.text);
      }
    );
  }


  //tab n navigation
  clickRow(data: ProjectList, page: number) {
    console.log(data);
    switch(page) {
      case 1: {
        this.reqformNosrc = data.requestFormNo;
        this.reqformDescsrc = data.requestFormDesc;
        this.rerender();
        this.goSecondTab();
        break;
      }
      case 2: {
        this.reqformNosrc = data.requestFormNo;
        this.reqformDescsrc = data.requestFormDesc;
        this.stagesrc = data.stage;
        this.rerender();
        this.goThirdTab();
        break;
      }
      case 3: {
        break;
      }
    }
  }

  selectedTab(tabId: number) {
    this.projTabs.tabs[tabId].active = true;
  }

  goThirdTab(): void {
    //this.firstActive = false;
    this.thirdTabTitle = this.stagesrc;
    this.thirdActive = true;
    this.projTabs.tabs[2].active = true;
    this.projTabs.tabs[2].disabled = false;
  }

  goSecondTab(): void {
    //this.firstActive = false;
    this.secondTabTitle = this.reqformNosrc;
    if(this.reqformNosrc == ''){
      this.secondTabTitle = "(Memo)";
    }
    this.thirdTabTitle = "";
    this.thirdActive = false;
    this.thirdDisabled = true;
    this.secondActive = true;
    this.secondDisabled = false;
    this.projTabs.tabs[1].active = true;
    this.projTabs.tabs[1].disabled = false;
    this.projTabs.tabs[2].active = false;
    this.projTabs.tabs[2].disabled = true;
  }

  goFirstTab(): void {
    this.secondTabTitle = "";
    this.thirdTabTitle = "";
    this.secondActive = false;
    this.secondDisabled = true;
    this.thirdActive = false;
    this.thirdDisabled = true;
    this.projTabs.tabs[0].active = true;
    this.projTabs.tabs[0].disabled = false;
    this.projTabs.tabs[1].active = false;
    this.projTabs.tabs[1].disabled = true;
    this.projTabs.tabs[2].active = false;
    this.projTabs.tabs[2].disabled = true;
  }

}
