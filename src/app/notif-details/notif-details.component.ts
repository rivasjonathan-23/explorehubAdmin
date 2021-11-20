import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-notif-details',
  templateUrl: './notif-details.component.html',
  styleUrls: ['./notif-details.component.scss']
})
export class NotifDetailsComponent implements OnInit {
  public services: any;
  public modalContainerHeight: number;
  public loading: boolean = false;
  public pagesData: any
  public clickedPic: string =  null;
  public types = { "date-input": "Date Input", "text-input": "Text Input", "number-input": "Number Input", "choices-input": "Choices Input" }
  public inputType = {
    "date-input": { startDate: "Booking Starting Date", endDate: "Booking End Date", none: "Ordinary Date Input" },
    "text-input": { gmail: "Gmail", none: "Ordinary Text Input" },
    "number-input": { mobileNumber: "Mobile Phone Number", none: "Amount Input", otherType: "Others (With specified length)" }
  }
  tabIndex;

  constructor(public route: ActivatedRoute, public dialogRef: MatDialogRef<NotifDetailsComponent>,
    private adminService: AdminService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.goToConversation()
  }

  ngOnInit() {
    this.modalContainerHeight = window.innerHeight - 200;
    this.pagesData = Array.of(this.data)
    this.services = this.data.services



    this.services = this.services.map(comp => {
      comp.data = comp.data.filter(data => data.defaultName != "quantity")
      return comp
    })
  }
  getPhoto(components: any[]) {
    let photo;
    components.forEach(element => {
      if (element.type == "photo") {
        photo = !photo? element.data[0].url: photo
        return;
      }
    });
    return photo
  }
  goToConversation() {

    this.route.queryParams.subscribe(
      (params: any) => {

        if (params.pageId) {
          this.tabIndex = 2;
        }
      }
    )
  }

  getPageName(page) {
    let name = "------"
    page.components.forEach(comp => {
      if (comp.data.defaultName == "pageName") {
        name = comp.data.text
      }
    })
    return name;
  }

  getPendingPage(page) {
    this.loading = true
    const pageName = this.getPageName(page)
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Pending",
      message: `Your page <b>${pageName}</b> status has been set back to <b>Pending</b>`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page <b>${pageName}</b> status has been set back to <b>Pending</b>` })
      this.closeDialog("Pending")
      this.loading = false
    })
  }

  getProcessPage(page) {
    this.loading = true
    const pageName = this.getPageName(page)
    const message = (page.status == "Online") ? `Your page <b>${pageName}</b> status has been set back to <b>Processing</b>` : `Your page <b>${pageName}</b> status has been set to <b>Processing</b>`
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Processing",
      message: message,
    }
    // this.adminService.notify({ user: this.adminService.user, bookingId: this.booking._id, type: "Cancelled_booking-provider", receiver: notificationData.receiver, message: notificationData.message })
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: message })
      this.closeDialog("Processing")
      this.loading = false
    })
  }

  toApprove(page) {
    this.loading = true
    const pageName = this.getPageName(page)
    const notif = {
      page: page._id,
      pageName: pageName,
      mainReceiver: page.creator._id,
      receiver: page.creator._id,
      sender: this.adminService.user._id,
      pageCreator: page.creator._id,
      subject: page._id,
      type: "page-provider",
      status: "Processing",
      message: `Your page <b>${pageName}</b> was approved`,
    }
    this.adminService.setPageStatus(notif).subscribe((data) => {
      this.adminService.updatePendingPagesCount.emit()
      this.adminService.notify({ user: this.adminService.user, pageId: page._id, type: "page-provider", receiver: [page.creator._id], message: `Your page <b>${pageName}</b> was approved.` })
      this.closeDialog("Processing")
      this.loading = false
    })
  }


  closeDialog(status) {
    this.dialogRef.close(status);
    this.loading = false
  }

}
