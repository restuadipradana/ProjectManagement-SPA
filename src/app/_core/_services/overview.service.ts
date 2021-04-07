import { ProjectList } from './../_models/project-list';
import { WeekList } from './../_models/week-list';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  search(dataTablesParam: any) {
    const url = this.baseUrl + 'overview/weekly';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  deleteWeekly(weekly: WeekList){
    return this.http.post(this.baseUrl + 'overview/weekly-delete', weekly);
  }

  listProjL1(dataTablesParam: any) {
    const url = this.baseUrl + 'overview/get-l1';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  listProjL2(dataTablesParam: any) {
    const url = this.baseUrl + 'overview/get-l2';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  listProjL3(dataTablesParam: any) {
    const url = this.baseUrl + 'overview/get-l3';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  addStage(proj: ProjectList) {
    console.log("addstg", proj);
    return this.http.post(this.baseUrl + 'overview/add-projstage', proj);
  }

  addMemo2(proj: ProjectList) {
    console.log("addmemo2", proj);
    return this.http.post(this.baseUrl + 'overview/add-memo2', proj);
  }

  deleteStage(proj: ProjectList) {
    return this.http.post(this.baseUrl + 'overview/delete-stage', proj);
  }
}
