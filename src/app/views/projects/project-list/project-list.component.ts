import { SearchCriteriaDT } from './../../../_core/_models/dtModels/datatable';
import { Component, OnInit, ViewChild,  ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PmL1 } from '../../../_core/_models/pm-l1';
import { PmList } from '../../../_core/_models/pm-list';
import { ProjectService } from '../../../_core/_services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, AfterViewInit {

  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('confirmModal') public confirmModal: ModalDirective;

  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('projTabs', { static: false }) projTabs: TabsetComponent;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>; //gatau biar bisa rerender multiple table

  //dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '', filter4: '0' };
  searchCriteria2: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx', filter4: '0'  };
  searchCriteria3: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx', filter4: '0'  };

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

  listProjectL1: PmL1[];
  listProjS: any = {};
  listProjL2: PmList[];
  listProjL3: PmList[];
  reqformNosrc: string = "";
  reqformDescsrc: string = "";
  stagesrc: string ="";
  systemsrc: string = "";
  pjstagesrc: string = "";


  isDisableBtn: boolean;
  alertsDismiss: any = [];
  projstat: Array<Select2OptionData> =  [
    {id: '0', text: 'Open'},
    {id: '1', text: 'Close'},
    ];
  status: string
  kemon: number = 1

  constructor(private toastr: ToastrService, private _projectSvc: ProjectService) { }

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
        this._projectSvc.listProjL1(dataTablesParameters)
          .subscribe(resp => {
            this.listProjectL1 = resp.data;
            console.log("resp1: ", resp);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'latestWeek'  },
        { data: 'system'  },
        { data: 'pjStage'  },
        { data: 'countReq' },
        { data: 'stage' },
        { data: 'latestUpdateStage' },
        { data: 'stageActualFinish' }

      ],
      order: [],
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
        this._projectSvc.listProjL2(dataTablesParameters)
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
        { data: 'week' },
        { data: 'system'  },
        { data: 'pjStage'  },
        { data: 'reqNo' },
        { data: 'reqSubject' },
        { data: 'stage' },
        { data: 'expectedFinish' },
        { data: 'stagePlanFinish'  },
        { data: 'stageActFinish' },
        { data: 'giveTest' },
        { data: 'applyDate' },
        { data: 'applicant' },
        { data: 'pic'  },
        { data: 'memo' , 'orderable': false },
        { data: 'createAt' }
      ],
      order: [],
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
        this._projectSvc.listProjL3(dataTablesParameters)
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
        { data: 'action', 'orderable': false },
        { data: 'week' },
        { data: 'system'  },
        { data: 'pjStage'  },
        { data: 'reqNo' },
        { data: 'reqSubject' },
        { data: 'stage' },
        { data: 'expectedFinish' },
        { data: 'stagePlanFinish'  },
        { data: 'stageActFinish' },
        { data: 'giveTest' },
        { data: 'applyDate' },
        { data: 'applicant' },
        { data: 'pic'  },
        { data: 'memo' , 'orderable': false },
        { data: 'createAt' }
      ],
      order: [],
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
    this.searchCriteria2.filter = this.systemsrc;
    this.searchCriteria2.filter2 = this.pjstagesrc;
    this.searchCriteria2.filter3 = this.stagesrc;
    this.searchCriteria3.filter = this.reqformNosrc;
    this.searchCriteria.filter4 = this.status;
    this.searchCriteria2.filter4 = this.status;
    this.searchCriteria3.filter4 = this.status;
    //this.searchCriteria3.filter2 = this.reqformDescsrc;
    //this.searchCriteria3.filter3 = this.stagesrc;

    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    });
  }

  statusChg() {
    if (this.kemon > 1) {
      console.log('stachg', this.status)
      this.rerender()
    }
    this.kemon++
  }

  showNotif(message: any) {
    this.alertsDismiss.push({
      type: 'warning',
      msg: message,
      timeout: 3000
    });
  }

  clickRow(data: PmList, page: number) {
    console.log(data);
    switch(page) {
      case 1: {
        this.systemsrc = data.system;
        this.pjstagesrc = data.pjStage;
        this.stagesrc = data.stage;
        this.rerender();
        this.goSecondTab();
        break;
      }
      case 2: {
        this.reqformNosrc = data.reqNo;
        //this.reqformDescsrc = data.reqSubject;
        //this.stagesrc = data.stage;
        this.rerender();
        this.goThirdTab();
        break;
      }
      case 3: {
        break;
      }
    }
  }

  //modal (kind 1 add stage, 2 add memo2)
  openModal(data: PmList, kind: number) {
    if (kind == 1) {
      const asm = data;
      //this.modData = data;
      //this.listProjS = {}
      this.listProjS = Object.assign({}, data);
      this.listProjS.expectedFinish = this.listProjS.expectedFinish === null ? "" : this.listProjS.expectedFinish.split('T')[0]
      this.listProjS.stagePlanFinish = this.listProjS.stagePlanFinish === null ? "" : this.listProjS.stagePlanFinish.split('T')[0]
      this.listProjS.stageActFinish = this.listProjS.stageActFinish === null ? "" : this.listProjS.stageActFinish.split('T')[0]
      this.listProjS.giveTest = this.listProjS.giveTest === null ? "" : this.listProjS.giveTest.split('T')[0]
      this.listProjS.applyDate = this.listProjS.applyDate === null ? "" : this.listProjS.applyDate.split('T')[0]
      this.listProjS.memo
      console.log('om', this.listProjS)

      this.editModal.show();
    }
    // if (kind == 2) {
    //   this.modData = data;
    //   this.memo2Modal.show();
    // }
    // if (kind == 3) {
    //   this.modData = data;
    //   this.deleteModal.show();
    // }
  }

  save(kind: number) {
    //1 change, 2 close req no
    console.log("before save", this.listProjS);
    if (kind == 1) {

      this._projectSvc.editProj(this.listProjS).subscribe(
        (res: any) => {
          console.log(res);
          this.editModal.hide();
          this.toastr.success('Success to edit', 'Success')
          this.rerender();
        },
        (error) => {
          console.log(error);
          this.showNotif(error.error);
          this.toastr.warning(error.error, 'Fail to edit!')
        }
      );
    }
    if (kind == 2) {
      this._projectSvc.closeReqNo(this.listProjS).subscribe(
        (res: any) => {
          console.log(res);
          this.editModal.hide();
          this.confirmModal.hide()
          this.toastr.success('Success to close', 'Success')
          this.rerender();
        },
        (error) => {
          console.log(error);
          this.confirmModal.hide()
          this.showNotif(error.error);
          this.toastr.warning(error.error, 'Fail to edit!')
        }
      );
    }
  }













  selectedTab(tabId: number) {
    this.projTabs.tabs[tabId].active = true;
  }

  goThirdTab(): void {
    //this.firstActive = false;
    this.thirdTabTitle = this.reqformNosrc;
    this.thirdActive = true;
    this.projTabs.tabs[2].active = true;
    this.projTabs.tabs[2].disabled = false;
  }

  goSecondTab(): void {
    //this.firstActive = false;
    this.secondTabTitle = this.systemsrc;
    if(this.systemsrc == ''){
      this.secondTabTitle = "System";
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
