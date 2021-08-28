import { SearchCriteriaDT } from './../../../_core/_models/dtModels/datatable';
import { Component, OnInit, ViewChild,  ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subject, Observable, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PmL1 } from '../../../_core/_models/pm-l1';
import { PmList } from '../../../_core/_models/pm-list';
import { ProjectService } from '../../../_core/_services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('projTabs', { static: false }) projTabs: TabsetComponent;
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>; //gatau biar bisa rerender multiple table

  //dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '', filter2: '', filter3: '' };
  searchCriteria2: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx' };
  searchCriteria3: SearchCriteriaDT = { isPageLoad: true, filter: 'xx', filter2: 'xx', filter3: 'xx' };

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
  listProjL2: PmList[];
  listProjL3: PmList[];
  reqformNosrc: string = "";
  reqformDescsrc: string = "";
  stagesrc: string ="";


  isDisableBtn: boolean;
  alertsDismiss: any = [];

  constructor(private _projectSvc: ProjectService) { }

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
      order: [3, 'desc'],
      autoWidth: false
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
        this.reqformNosrc = data.reqNo;
        this.reqformDescsrc = data.reqSubject;
        this.rerender();
        this.goSecondTab();
        break;
      }
      case 2: {
        this.reqformNosrc = data.reqNo;
        this.reqformDescsrc = data.reqSubject;
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
