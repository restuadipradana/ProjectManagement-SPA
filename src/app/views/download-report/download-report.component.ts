import { ProjectList } from './../../_core/_models/project-list';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  exportExcel() {
    return this.http.post(this.baseUrl + 'report/exportExcel',{},{responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'SummaryReport_' + currentTime.getFullYear().toString() + '-' +
          (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + 
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });

  }

}
