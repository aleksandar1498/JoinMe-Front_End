import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from '../components/common/notification/error/error-notifier/error-notifier.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService) { }

  renderErrors(errors: any) {
    this.notificationService.showError(errors.error.error);
  }

  renderServerErrors(form: FormGroup, errors: any) {
    for (const prop of Object.keys(errors.error)) {
      const formControl = form.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors.error[prop]
        });
      } else {
        this.notificationService.showError(errors.error[prop] ? errors.error[prop] : 'Something went wrong, contact the administator');
        break;
      }
    }

  }
}
