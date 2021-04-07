import { UploadService } from './../../_core/_services/upload.service';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { Select2OptionData } from 'ng-select2';
import { WeekList } from './../../_core/_models/week-list';
import { SupportService } from './../../_core/_services/support.service';
import { DOCUMENT } from '@angular/common';

//temp, move to svc
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  dynamic: number;
  weeks: Array<Select2OptionData>;
  weekList = new WeekList;
  weekId: string = '';
  alertsDismiss: any = [];

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private _supportSvc: SupportService, private http: HttpClient, @Inject(DOCUMENT) private _document: Document, private _uploadSvc: UploadService) { }

  ngOnInit(): void {
    this.dynamic = 45;
    this.getListWeek();
  }

  weekChange() {
    this.weekId = this.weekList.id;
    console.log("minggu id", this.weekId);
  }

  getListWeek() {
    this._supportSvc.getWeekList().subscribe(res => {
      this.weeks = res.map(item => {
        return { id: item.id, text: item.week };
      });
      this.weekList.id = '';
    })
  }

  showNotif(message: any) {
    this.alertsDismiss.push({
      type: 'info',
      msg: message,
      timeout: 3000
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    if (this.weekId === null || this.weekId === '') {
      this.showNotif("Select week first!")
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append(this.weekId, fileToUpload, fileToUpload.name);
    this._uploadSvc.uploadExcel(formData)
    //this.http.post('https://localhost:5001/api/upload/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          //this._document.defaultView.location.reload();
        }
        console.log("suces", event);
      },
      (error) => {
        console.log("ero", error.error);
      });
      this.weekId = '';
      
  }

}
