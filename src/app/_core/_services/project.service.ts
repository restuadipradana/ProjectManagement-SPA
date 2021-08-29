import { Injectable } from '@angular/core';
import { PmL1 } from '../_models/pm-l1';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listProjL1(dataTablesParam: any) {
    const url = this.baseUrl + 'project/get-l1';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  listProjL2(dataTablesParam: any) {
    const url = this.baseUrl + 'project/get-l2';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  listProjL3(dataTablesParam: any) {
    const url = this.baseUrl + 'project/get-l3';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }
}
