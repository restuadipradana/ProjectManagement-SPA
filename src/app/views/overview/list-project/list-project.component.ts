import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  @ViewChild('projTabs', { static: false }) projTabs: TabsetComponent;  
  tabLevelIdx: number;
  prevPosIdx: number;

  firstActive: boolean = true;
  firstDisabled: boolean = false;

  secondTabTitle: string = "";
  secondActive: boolean = false;
  secondDisabled: boolean = true;

  thirdTabTitle: string = "";
  thirdActive: boolean = false;
  thirdDisabled: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  selectedTab(tabId: number) {
    this.projTabs.tabs[tabId].active = true;
  }

  goThirdTab(): void {
    //this.firstActive = false;
    this.thirdTabTitle = "ini tab ke3333333";
    this.thirdActive = true;
    this.projTabs.tabs[2].active = true;
    this.projTabs.tabs[2].disabled = false;
  }

  goSecondTab(): void {
    //this.firstActive = false;
    this.secondTabTitle = "ini tab ke2";
    this.thirdTabTitle = "";
    this.thirdActive = false;
    this.thirdDisabled = true;
    this.secondActive = true;
    this.secondDisabled = false;
    this.projTabs.tabs[1].active = true;
    this.projTabs.tabs[1].disabled = false;
    this.projTabs.tabs[2].active = false;
    this.projTabs.tabs[2].disabled = true;
  }

  goFirstTab(): void {
    this.secondTabTitle = "";
    this.thirdTabTitle = "";
    this.secondActive = false;
    this.secondDisabled = true;
    this.thirdActive = false;
    this.thirdDisabled = true;
    this.projTabs.tabs[0].active = true;
    this.projTabs.tabs[0].disabled = false;
    this.projTabs.tabs[1].active = false;
    this.projTabs.tabs[1].disabled = true;
    this.projTabs.tabs[2].active = false;
    this.projTabs.tabs[2].disabled = true;
  }

}
