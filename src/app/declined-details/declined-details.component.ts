import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-declined-details',
  templateUrl: './declined-details.component.html',
  styleUrls: ['./declined-details.component.css']
})
export class DeclinedDetailsComponent implements OnInit {


  public booking = [];
  public bookingData = [];
  public selectedService = [];
  public page = [];
  constructor(public dialogRef: MatDialogRef<DeclinedDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data

  ) { }
  ngOnInit() {
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId.creator);
  }
}
