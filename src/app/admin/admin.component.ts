import { Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public counter1: any
  public counter2: any
  public bookings: any;
  public currentPath: string;
  public notificationCount: any;
  public pages: any
  constructor(public adminService: AdminService,
    public router: Router) { }
    
  ngOnInit(): void {
    this.getPendingBookingsCount()
    this.getPendingPagesCount()
    this.getNotificationCount()
  
    this.currentPath = this.router.url
    console.log(this.currentPath)
    this.adminService.changeMainTab.subscribe(tab => {
      this.currentPath = tab
    })
    this.adminService.notification.subscribe((data: any) => {
      if (data.type == "page-submission") {
        this.getPendingPagesCount()
      }
      if (data.booking && data.booking.status == "Pending" || data.booking && data.booking.status == "Cancelled") {
        this.getPendingBookingsCount()
      }
      this.getNotificationCount()
    })
    this.adminService.updatePendingBookingCount.subscribe(data => {
      this.getPendingBookingsCount()
    })
    this.adminService.updatePendingPagesCount.subscribe(data => {
      this.getPendingPagesCount()
    })
    this.adminService.updateNotificationCount.subscribe(data => {
      this.getNotificationCount()
    })
  }

  getPendingBookingsCount() {
    this.adminService.getPendingBookingsCount().subscribe(count => {
      this.counter1 =  count != 0 ? count : ""
    })
  }

  getPendingPagesCount() {
    this.adminService.getPendingPagesCount().subscribe(count => {
      this.counter2 = count != 0 ? count : ""
    })
  }

  getNotificationCount() {
    this.adminService.getNotificationCount().subscribe(count => {
      this.notificationCount = count != 0 ? count: ""
    })
  }
  logOut() {
    Swal.fire({
      // toast:true,
      position: 'top-end',
      title: 'Are you sure you want to logout?',
      confirmButtonText: `Yes`,
      confirmButtonColor: 'rgb(11, 155, 30)',
      width: 400,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteToken();
        this.adminService.loggedOutAdmin.emit()
        this.router.navigate(['login']);
      }
    })
  }
  goTo(clicked) {
    this.currentPath = "/"+clicked
    this.adminService.currentPath = clicked
    this.router.navigate(["/admin/" + clicked])
  }
}