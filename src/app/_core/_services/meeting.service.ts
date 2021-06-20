import { MeetingDetail } from './../_models/meeting-detail';
import { MeetingHistory } from '../_models/meeting-history';
import { Meeting } from './../_models/meeting';
import { Injectable } from '@angular/core';
import { ResponseDT } from '../_models/dtModels/datatable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  baseUrl = environment.apiUrl;
  funcMGuid = new BehaviorSubject<string>('guid');
  currFuncMGUid = this.funcMGuid.asObservable();

  constructor(private http: HttpClient) { }

  chgFuncMGuid(idm: string) {
    this.funcMGuid.next(idm);
  }

  meetingList(dataTablesParam: any) {
    const url = this.baseUrl + 'meeting/meetings';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  meetingDetailList(dataTablesParam: any) {
    const url = this.baseUrl + 'meeting/meeting-details';
    return this.http.post<ResponseDT>(url, dataTablesParam, {});
  }

  getMeeting(id: string) {
    return this.http.get<Meeting>(this.baseUrl + 'meeting/meeting', {params : {id:id}});
  }

  addMeeting(meeting: Meeting) {
    console.log("Service: ", meeting);
    return this.http.post(this.baseUrl + 'meeting/create-meeting', meeting);
  }

  deleteMeeting(meeting: Meeting) {
    return this.http.post(this.baseUrl + 'meeting/meeting-delete' , meeting);
  }

  addDetail(idmm: string, detail: MeetingDetail) {
    return this.http.post(this.baseUrl + 'meeting/create-detail/' + idmm, detail);
  }

  editDetail(detail: MeetingDetail) {
    return this.http.post(this.baseUrl + 'meeting/update-detail' , detail);
  }

  deleteDetail(meeting: Meeting) {
    return this.http.post(this.baseUrl + 'meeting/detail-delete' , meeting);
  }

  getHistoryList(id: string){
    return this.http.get<any>(this.baseUrl + 'meeting/detail-histories', {params : {id:id}})
  }


}
