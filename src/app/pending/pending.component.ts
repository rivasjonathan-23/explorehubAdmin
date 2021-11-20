import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailsComponent } from './../pending-details/pending-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  public show = true;
  bookingAccount: any[] = []
  public interval: any;
  displayedColumns: string[] = ['id', 'fullName', 'location', 'dateProcess'];
  dataSource: MatTableDataSource<any>;
  constructor(public dialog: MatDialog,
    private adminService: AdminService, public route: ActivatedRoute,) {
    this.getBookings()


  }
  ngOnInit() {
    this.show = true
    this.adminService.notification.subscribe(
      (data: any) => {
        if (data.booking && data.booking.status == "Processing" || data.booking && data.booking.status == "Cancelled") {
          this.getBookings()
        }
      }
    )
    if(this.interval) {
      clearInterval(this.interval)
    } 
  }
  getBookings() {
    this.adminService.getAllBookings('Processing').subscribe((data: any[]) => {
      this.show = false
      this.bookingAccount = data;
      this.bookingAccount = this.bookingAccount.filter(booking => !booking.isManual)
      this.populateTable()
      this.route.queryParams.subscribe(
        (params: any) => {
          if (params && params.bookingId) {
            this.bookingAccount.forEach(booking => {
              if (booking._id == params.bookingId) {
                this.openModal(booking);
              }
            })
          }
        }
      )
      this.startTime()
    }
    );
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
  openModal(id) {
    const dialogRef = this.dialog.open(PendingDetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: id,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingAccount = this.bookingAccount.filter(booking => booking._id != result)
        this.populateTable()
      }
    });
  }
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  startTime() {
    if(this.interval) {
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
          this.adminService.processingTimeEnded.emit("A booking processing time has ended!")
        }
      } else  {
        booking['timesUp'] = true
      }
      return booking;
    });
  }


}
