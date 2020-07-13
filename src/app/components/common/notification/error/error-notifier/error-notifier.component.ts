import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-notifier',
  templateUrl: './error-notifier.component.html',
  styleUrls: ['./error-notifier.component.css']
})
export class ErrorNotifierComponent {
  message:string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data,
    private _snackRef: MatSnackBarRef<ErrorNotifierComponent>,
    private ren: Renderer2
  ) {
    this.message = data.error;
    setTimeout(() => {
      let snackEl = document.getElementsByClassName('mat-snack-bar-container').item(0);
      ren.listen(snackEl, 'click', () => this.dismiss());
    });
  }

  dismiss() {
    this._snackRef.dismiss();
  }

}
