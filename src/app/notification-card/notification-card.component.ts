import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input() notif: any = {
    _id: "",
    receiver: "",
    createdAt: "",
    message: "",
    opened: false,
  }

  @Input() notificationGroup: any;

  constructor(public router: Router, public mainService: AdminService) { }

  ngOnInit() {
    if (this.notif && this.notif.createdAt) {
    }
  }

  viewNotification() {

    this.mainService.viewNotification({ notifId: this.notif["isMessage"]?this.notif._id: this.notificationGroup._id, isMessage: this.notif["isMessage"] }).subscribe(
      response => {
        if (this.notif["isMessage"]) {
          this.notif.opened = true
        } else {
          this.notificationGroup.notifications = this.notificationGroup.notifications.map(notif => {  
            if (!notif.isMessage) {
              notif.opened = true
            }
            return notif
          })
        }
        this.mainService.updateNotificationCount.emit()
        const type = this.notificationGroup.type
        if (type.split("-")[0] == ("booking")) {
          const status = { Pending: "new", Processing: "processing", Booked: "booked", Rejected: "declined" }
          if (status[this.notificationGroup.booking.status]) {
            this.router.navigate([`/admin/bookingNotif/${status[this.notificationGroup.booking.status]}`], { queryParams: { bookingId: this.notificationGroup.booking._id } })
          } else {
            alert("Booking is no longer available")
          }
        } else if (type == "page-admin") {
          if (this.notificationGroup.page) {

            let param = { queryParams: { pageId: this.notificationGroup.page._id } }
            if (this.notificationGroup.page.status == "Online" || this.notificationGroup.page.status == "Not Operating") {
              this.router.navigate(["/admin/pageToApprove/onlinePages"], param)
            } else {
              this.router.navigate(["/admin/pageToApprove/pendingPages"], param)
            }
          } else {
            alert("The page is already deleted!")
          }
        }
        // if (type == "booking") {
        //   this.router.navigate(["/service-provider/view-booking", this.booking._id],
        //   { queryParams: { notification: true } })
        // } else if (type == "page") {
        //   this.router.navigate(["/service-provider/dashboard", this.page.pageType, this.page._id],
        //     { queryParams: { notification: true } })
        // }
        // else if (type == "page-booking") {
        //   this.router.navigate(["./service-provider/view-booking-as-provider", this.booking.pageId, this.booking.bookingType, this.booking._id, this.booking.status],
        //     { queryParams: { notification: true } })
        // }

      }

    )
  }

}

