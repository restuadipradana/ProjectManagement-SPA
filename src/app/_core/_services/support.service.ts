import { UserList } from './../_models/user-list';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDT } from '../_models/dtModels/datatable';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWeekList(){
    return this.http.get<any>(this.baseUrl + 'settings/get-week');
  }
  getNoUploadWeekList(){
    return this.http.get<any>(this.baseUrl + 'settings/nouploaded-week');
  }
  generateWeek(year: string){
    console.log("tahun ", year)
    return this.http.get<string>(this.baseUrl + 'settings/generate-week', { params: {year:year} } );
  }

  getUserList(){
    return this.http.get<any>(this.baseUrl + 'settings/get-user');
  }
  createUser(newUser: string){
    console.log("user ", newUser)
    return this.http.get<string>(this.baseUrl + 'settings/create-user', { params: {user:newUser} } );
  }

  editUser(user: UserList) {
    return this.http.post(this.baseUrl + 'settings/edit-user/', user);
  }

  getStage(stage: string){
    return this.http.get<string>(this.baseUrl + 'settings/get-stage', { params: {stage:stage} } );
  }
}
