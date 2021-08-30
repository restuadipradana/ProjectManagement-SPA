import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DateRange } from '../../../_core/_models/date-range';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  baseUrl = environment.apiUrl;
  dateRange: DateRange ={ startDate: null, endDate: null};
  alertsDismiss: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  search() {
    console.log(this.dateRange);
    if (this.dateRange.startDate === null || this.dateRange.endDate === null) {
      this.showNotif("Please fill date range!", "warning")
      return
    }
    else if (this.dateRange.startDate > this.dateRange.endDate) {
      this.showNotif("Invalid date!", "warning")
      return
    }
    this.exportExcel(this.dateRange)
    Object.assign(this.dateRange, {startDate: null, endDate: null})
    console.log(this.dateRange);

  }

  showNotif(message: any, tipe: string) {
    this.alertsDismiss.push({
      type: tipe,
      msg: message,
      timeout: 5200
    });
  }

  exportExcel(range: DateRange) {
    //{} isi model date range
    return this.http.post(this.baseUrl + 'report/project',range,{responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'PM-Report_' + currentTime.getFullYear().toString() + '-' +
          (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });

  }

}
