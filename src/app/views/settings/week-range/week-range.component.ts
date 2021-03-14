import { WeekList } from './../../../_core/_models/week-list';
import { SupportService } from './../../../_core/_services/support.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-range',
  templateUrl: './week-range.component.html',
  styleUrls: ['./week-range.component.scss']
})
export class WeekRangeComponent implements OnInit {

  year: string = "";
  alertsDismiss: any = [];
  listWeek: WeekList[];
  resultMsg: any = {};

  constructor(private _supportSvc: SupportService) { }

  ngOnInit(): void {
    this.getWeekList();
  }

  showNotif(message: any) {
    this.alertsDismiss.push({
      type: 'info',
      msg: message,
      timeout: 3000
    });
  }

  generateWeek(){
    if(this.year != null && this.year != "" && this.year.toString().length == 4 && this.year.toString().substring(0, 2) == "20")
    {
      this._supportSvc.generateWeek(this.year).subscribe(
        (res: any) => {
          this.resultMsg = res;
          console.log(this.resultMsg.message);
          this.year = "";
          this.showNotif(this.resultMsg.message);
        },
        (error) => {
          console.log("Error: " , error.error);
          this.showNotif("Error! ");
        }
      );


      this.year = "";
    }
    else
    {
      this.showNotif("Invalid year");
    }
  }

  getWeekList(){
    this._supportSvc.getWeekList().subscribe(
      (res: any) => {
        this.listWeek = res;
        console.log(this.listWeek);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showNotif(error.error.text);
      }
    );
  }

}
