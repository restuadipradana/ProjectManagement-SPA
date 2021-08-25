import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { Select2OptionData } from 'ng-select2';
import { WeekList } from '../../../_core/_models/week-list';
import { SupportService } from '../../../_core/_services/support.service';
import { DOCUMENT } from '@angular/common';
import { UploadService } from '../../../_core/_services/upload.service';
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
    this._supportSvc.getNoUploadWeekList().subscribe(res => {
      this.weeks = res.map(item => {
        return { id: item.id, text: item.week };
      });
      this.weekList.id = '';
    })
  }

  showNotif(message: any, tipe: string) {
    this.alertsDismiss.push({
      type: tipe,
      msg: message,
      timeout: 5200
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    if (this.weekId === null || this.weekId === '') {
      this.showNotif("Select week first!", "warning")
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append(this.weekId, fileToUpload, fileToUpload.name);
    this._uploadSvc.uploadPM(formData)
    //this.http.post('https://localhost:5001/api/upload/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.showNotif("Upload successfully! This page will refresh", "info")
          setTimeout(() => {
            this._document.defaultView.location.reload();
          }, 4000);
        }
        console.log("suces", event);

      },
      (error) => {
        console.log("ero", error.error);
        this.showNotif(error.error.restu, "danger");
        setTimeout(() => {
          this._document.defaultView.location.reload();
        }, 6000);

      });
      this.weekId = '';


  }

}
