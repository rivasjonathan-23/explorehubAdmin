import { AdminService } from './../service/admin.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-booked-details',
  templateUrl: './booked-details.component.html',
  styleUrls: ['./booked-details.component.css']
})
export class BookedDetailsComponent implements OnInit {

  public booking = [];
  public bookingData = [];
  public selectedService = [];
  public page = [];
  constructor(public dialogRef: MatDialogRef<BookedDetailsComponent>,
              private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data

  ) { }
  ngOnInit() {
    this.booking = Array.of(this.data);
    this.bookingData = this.data.bookingInfo;
    this.selectedService = this.data.selectedServices;
    this.page = Array.of(this.data.pageId.creator);

    const bookingStatus = this.booking[0].status;
  }

}
