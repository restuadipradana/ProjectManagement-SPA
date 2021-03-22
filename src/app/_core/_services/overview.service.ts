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
}
