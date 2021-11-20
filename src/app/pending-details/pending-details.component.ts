import { AdminService } from './../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.scss']
})
export class PendingDetailsComponent implements OnInit {

  public booking = [];
  public bookingData = [];
  public selectedService = [];
  public page = [];
  constructor(public dialogRef: MatDialogRef<PendingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data

  ) { }
  ngOnInit() {
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId.creator);
    const bookingStatus = this.booking[0].status;
  }
  closeModal() {
    this.dialogRef.close();
  }
}
