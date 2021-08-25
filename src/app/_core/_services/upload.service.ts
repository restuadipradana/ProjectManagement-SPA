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
export class UploadService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  uploadExcel(data: any) {
    return this.http.post(this.baseUrl + 'upload/upload', data, {reportProgress: true, observe: 'events'});
  }

  uploadExcelMeeting(data: any) {
    return this.http.post(this.baseUrl + 'meeting/upload', data, {reportProgress: true, observe: 'events'});
  }

  uploadPM(data: any) {
    return this.http.post(this.baseUrl + 'upload/upload-pm', data, {reportProgress: true, observe: 'events'});
  }
}
