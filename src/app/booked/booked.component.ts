import { ViewChild } from '@angular/core';
import { AdminService } from './../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { BookedDetailsComponent } from '../booked-details/booked-details.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  public show = true;
  bookingAccount: any[] = [];
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
        if (data.booking && data.booking.status == "Booked" || data.booking && data.booking.status == "Closed" || data.booking && data.booking.status == "Cancelled") {
          this.getBookings()

        }
      }
    )

    
  }

  getBookings() {
    this.adminService.getAllBookings('Booked').subscribe((data: any[]) => {
      this.show = false
      this.bookingAccount = data;
      this.bookingAccount = this.bookingAccount.filter(booking => !booking.isManual)
      this.populateTable();
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
    }
    );
  }

  populateTable() {
    this.dataSource = new MatTableDataSource<any>(this.bookingAccount);

    // setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    // }, 100)

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.tourist.fullName.toLocaleLowerCase().includes(filter)
    }
  }

  openModal(data) {

    const dialogRef = this.dialog.open(BookedDetailsComponent, {
      disableClose: false,
      id: 'modal-component',
      data: data,
      panelClass: 'custom-modalbox'
    })

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

}
