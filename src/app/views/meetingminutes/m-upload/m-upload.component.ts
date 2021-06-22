import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { UploadService } from '../../../_core/_services/upload.service';
import { DOCUMENT } from '@angular/common';
import { HttpEventType, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-m-upload',
  templateUrl: './m-upload.component.html',
  styleUrls: ['./m-upload.component.scss']
})
export class MUploadComponent implements OnInit {

  dynamic: number;
  alertsDismiss: any = [];

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor( @Inject(DOCUMENT) private _document: Document, private _uploadSvc: UploadService) { }

  ngOnInit(): void {
  }

  showNotif(message: any, tipe: string) {
    this.alertsDismiss.push({
      type: tipe,
      msg: message,
      timeout: 6000
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("meeting minutes excel", fileToUpload, fileToUpload.name);
    this._uploadSvc.uploadExcelMeeting(formData)
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
        this.showNotif(error.error, "danger");
        setTimeout(() => {
          this._document.defaultView.location.reload();
        }, 8000);

      });


  }

}
