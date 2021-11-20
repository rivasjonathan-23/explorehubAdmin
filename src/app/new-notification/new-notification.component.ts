import { EventEmitter, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DetailsComponent } from './../details/details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
// export interface PeriodicElement {
//   id :Number;
//   fullName: string;
//   localtion:string;
//   dateProcess:Date
// }
@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})


export class NewNotificationComponent implements OnInit {
  public show = true;
  public interval: any;
  bookingAccount: any[] = []
  @Input() passData: { bookingAccount };//data to pass pra nis filter wa ni gana huhuhuh
  @Output() searchBooking = new EventEmitter<String>();
  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute,) {
    this.getBookings()
  }

  ngOnInit(): void {
    this.show = true
    this.adminService.notification.subscribe(
      (data: any) => {
        if (data.booking && data.booking.status == "Pending" || data.booking && data.booking.status == "Cancelled") {
          this.getBookings()
        }
      }
    )
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  getBookings(doNotOpen = false) {
    this.adminService.getAllBookings('Pending').subscribe((data: any[]) => {
      this.show = false
      this.bookingAccount = data;
      this.bookingAccount = this.bookingAccount.filter(booking => !booking.isManual)
      this.startTime()
      this.populateTable()
      this.route.queryParams.subscribe(
        (params: any) => {
          if (params && params.bookingId) {
            this.bookingAccount.forEach(booking => {
              if (booking._id == params.bookingId) {
                if (!doNotOpen) this.openModal(booking);
              }
            })
          }
        }
      )
    })
  }

  openModal(id: any) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      disableClose: true,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBookings(true)
        // this.bookingAccount = this.bookingAccount.filter(booking => booking._id != result)
        // this.populateTable()
      }
    });
  }

  populateTable() {
    this.dataSource = new MatTableDataSource<any>(this.bookingAccount);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0)

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.tourist.fullName.toLocaleLowerCase().includes(filter)
    }
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  startTime() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(async () => {
      this.updateTime().then((updated) => {
        this.bookingAccount = updated;
        const notExpired = this.bookingAccount.filter(booking => !booking["timesUp"])
        if (notExpired.length == 0) {
          clearInterval(this.interval);
        }
      });
    }, 1000);
  }

  async updateTime() {
    return await this.bookingAccount.map((booking) => {
      if (booking.timeLeft && booking.timeLeft > 0) {
        var min = booking.timeLeft / 60;
        min = min.toString().includes(".")
          ? Number(min.toString().split(".")[0])
          : min;
        var sec = booking.timeLeft % 60;
        if (sec == 0) {
          if (min == 0) {
            booking.timeLeft = 0;
          } else {
            min--;
            sec = 59;
          }
        } else {
          sec--;
        }
        booking.timeLeft--;
        booking["displayTime"] = min + ":" + (sec.toString().length > 1 ? sec : "0" + sec);
        if (booking.timeLeft <= 0) {
          booking['timesUp'] = true
          this.adminService.processingTimeEnded.emit("A response timer has ended!")
        }
      } else {
        booking['timesUp'] = true
      }
      return booking;
    });
  }

}
