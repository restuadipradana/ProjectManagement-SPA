import { UserList } from './../../../_core/_models/user-list';
import { SupportService } from './../../../_core/_services/support.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  newUser: string;
  alertsDismiss: any = [];
  listUser: UserList[];
  modalUser: UserList;
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor(private _supportSvc: SupportService, @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.getUserList();
  }

  showNotif(message: any) {
    this.alertsDismiss.push({
      type: 'info',
      msg: message,
      timeout: 3000
    });
  }

  createUser(){
    if(this.newUser != null && this.newUser != "" )
    {
      this._supportSvc.createUser(this.newUser).subscribe(
        (res: any) => {
          console.log(res);
          this.newUser = "";
          this.showNotif("Success");
        },
        (error) => {
          console.log("Error: " , error.error);
          this.showNotif("Error! ");
        }
      );
      this.newUser = "";
    }
    else
    {
      this.showNotif("Cannot empty");
    }
    this._document.defaultView.location.reload();
    //this.getUserList();
  }

  getUserList(){
    this._supportSvc.getUserList().subscribe(
      (res: any) => {
        this.listUser = res;
        console.log(this.listUser);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showNotif(error.error.text);
      }
    );
  }

  showEdit(clicked: UserList){
    this.modalUser = clicked;
  }
  editAction(clickedData: UserList){
    this.showEdit(clickedData);
    this.largeModal.show();
  }
  saveChangeEdit(filled: UserList){
    console.log(1, filled);
    this._supportSvc.editUser(filled).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log("Error: " , error.error.text);
        this.showNotif(error.error.text);
      }
    );
    this.largeModal.hide();
    this._document.defaultView.location.reload();
    //this.getUserList();

  }

}
