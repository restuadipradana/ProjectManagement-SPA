import { AlertifyService } from './../../../_core/_services/alertify.service';
import { WeekList } from './../../../_core/_models/week-list';
import { SearchCriteriaDT } from './../../../_core/_models/dtModels/datatable';
import { OverviewService } from './../../../_core/_services/overview.service';
import { ProjectList } from './../../../_core/_models/project-list';
import { ProjectL1List } from './../../../_core/_models/project-l1-list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Subject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {
  
  searchtxt: string;
  WeekLists: WeekList[];
  selectedWeekId: string;
  selectedWeek: WeekList;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  searchCriteria: SearchCriteriaDT = { isPageLoad: true, filter: '' };

  constructor(private _overviewSvc: OverviewService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
        this._overviewSvc.search(dataTablesParameters)
          .subscribe(resp => {
            this.WeekLists = resp.data;
            console.log(this.WeekLists);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'week', 'orderable': true },
        { data: 'action', 'orderable': false }
      ],
      order: [0, 'asc'],
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

  search() {
    this.rerender();
  }

  clickRow(dataclicked: WeekList){
    console.log(dataclicked);
    this.selectedWeekId = dataclicked.id;
    this.selectedWeek = dataclicked;
  }
  deleteWeekly(dataclicked: WeekList){
    this._overviewSvc.deleteWeekly(dataclicked).subscribe(() => {
      this.deleteModal.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    }, error => {
      console.log(error.error)
    });
  }

}
