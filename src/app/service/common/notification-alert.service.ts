import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationAlertService {
  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  constructor() { }
  showAlert(title:string,messaje: string, time: number = 5000) {
    this.alertSource.next({title,messaje,time});
  }
}
