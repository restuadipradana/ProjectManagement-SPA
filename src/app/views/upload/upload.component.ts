import { Component, OnInit } from '@angular/core';
// import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  dynamic: number;

  constructor() { }

  ngOnInit(): void {
    this.dynamic = 45;
  }

}
