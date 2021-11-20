import { MatDialogComponent } from './../mat-dialog/mat-dialog.component';
import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmedDialog(msg){
    this.dialog.open(MatDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      // position: { top: "10px" },
      data : {
        message : msg
      }
    });
  }

}
