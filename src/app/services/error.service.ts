import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from '../components/common/notification/error/error-notifier/error-notifier.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  renderErrors(form: FormGroup, errors: any) {
    console.log(form, errors);
    for (const prop of Object.keys(errors.error)) {
      const formControl = form.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors.error[prop]
        });
      } else {
        this.snackBar.openFromComponent(ErrorNotifierComponent, { data: { error: errors.error } });
        break;
      }
    }

  }

  renderServerErrors(form: FormGroup, errors: any) {
    for (const prop of Object.keys(errors.error)) {
      const formControl = form.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors.error[prop]
        });
      } else {
        this.snackBar.openFromComponent(ErrorNotifierComponent,
          { data: { error: errors.error[prop] ? errors.error[prop] : 'Something went wrong, contact the administator'  } });
        break;
      }
    }

  }
}
