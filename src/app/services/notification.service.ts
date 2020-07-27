import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  msg: BehaviorSubject<string>;
  isVisible: BehaviorSubject<boolean>;
  isSuccess: BehaviorSubject<boolean>;

  constructor() {
    this.msg = new BehaviorSubject('');
    this.isVisible = new BehaviorSubject(false);
    this.isSuccess = new BehaviorSubject(false);
  }

  message(): Observable<string> {
    return this.msg.asObservable();
  }

  visibility(): Observable<boolean> {
    return this.isVisible.asObservable();
  }

  type(): Observable<boolean> {
    return this.isSuccess.asObservable();
  }



  showSuccess(msg: string) {
    this.isSuccess.next(true);
    this.showMessage(msg);
  }
  showError(msg: string) {
    this.isSuccess.next(false);
    this.showMessage(msg);
  }
  showMessage(msg: string) {
    this.msg.next(msg);
    this.isVisible.next(true);
    this.waitDispose(5000);
  }


  waitDispose(ms: number) {
    setTimeout(() => {
      this.isVisible.next(false);
    }, ms);
  }
}
