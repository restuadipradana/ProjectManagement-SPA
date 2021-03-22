import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  confirm(title: string, msg: string, okCallback: () => any, cancelCallback: () => any, lblOK: string, lblCancel: string) {
    alertify.confirm(title, msg, function(e) {
      // if (e) {
      //   console.log(e);
        okCallback();
      // } else { }
    }, function(e) {
      cancelCallback();
    }).set('labels', {ok: lblOK, cancel: lblCancel});
  }
  success(message: string) {
    alertify.success(message);
  }
  
  error(message: string) {
    alertify.error(message);
  }
  
  warring(message: string) {
    alertify.warring(message);
  }
  
  message(message: string) {
    alertify.message(message);
  }
}
