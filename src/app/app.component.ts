import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationHandlerComponent } from './notification-handler/notification-handler.component';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,AfterViewInit, OnDestroy {
  @ViewChild(NotificationHandlerComponent) public notifHandler: NotificationHandlerComponent;
  title:string = 'admin-explorehub';
  public message: any;
  processingTimeEnded:boolean = false;

  constructor(public adminService: AdminService, public router: Router) {
  }


  ngOnInit() {
    if (this.notifHandler) {
      this.notifHandler.init()
    }
    this.adminService.processingTimeEnded.subscribe(
      data => {
        this.processingTimeEnded = true;
        this.message = data
        setTimeout(() => {
          this.processingTimeEnded = false;
        }, 9000);
      }
    )

    this.adminService.loggedInAdmin.subscribe(data => {
      if (this.notifHandler) {
        this.notifHandler.init()
      }
    })

    this.adminService.loggedOutAdmin.subscribe(data => {
      this.notifHandler.disconnect()
    })
  }

  ngAfterViewInit() {
      this.notifHandler.init();
  }

  goToProcessingTab() {
    this.processingTimeEnded = false
    const path = this.message == "A response timer has ended!" ? "new": "processing"
    this.router.navigate(["/admin/bookingNotif", path])
    this.adminService.changeTab.emit(path)
  }

  ngOnDestroy() {
    this.notifHandler.disconnect();
  }
}
