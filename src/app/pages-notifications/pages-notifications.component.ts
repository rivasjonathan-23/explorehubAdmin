import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifDetailsComponent } from './../notif-details/notif-details.component';

@Component({
  selector: 'app-pages-notifications',
  templateUrl: './pages-notifications.component.html',
  styleUrls: ['./pages-notifications.component.scss']
})
export class PagesNotificationsComponent implements OnInit {
  public pages: any;
  public processData: any;
  public bookings: any;
  public onlineData: any
  public currentPath: string;
  public counter1:any
  public counter2:any

  constructor(private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public adminService: AdminService
  ) {
    this.adminService.getAllPendingNotifications("Pending").subscribe((data) => {
      this.pages = data
      this.counter2 = this.pages.length
    })
    this.adminService.getAllPendingNotifications("Processing").subscribe((data) => {
      this.processData = data
    })
    this.adminService.getAllPendingNotifications("Online").subscribe((data) => {
      this.onlineData = data
    })

  }
  ngOnInit(): void {

    const path = this.router.url.split("/").reverse()[0]
    this.currentPath = path == "pageToApprove"? "pendingPages": path
    if (this.currentPath.includes("?")) this.currentPath = this.currentPath.split("?")[0]
    
    
    this.adminService.changeMainTab.emit("/pageToApprove")

  
    this.adminService.getAllBookings("Pending").subscribe((data)=>{
      this.bookings = data
      this.counter1 = this.bookings.length
    
    })
   
  }
  openModal(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '650px';
    dialogConfig.width = '600px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.data = id;
    const modalDialog = this.dialog.open(NotifDetailsComponent, dialogConfig);
  }

  logOut() {
    this.adminService.deleteToken();
    this.router.navigate(['login']);
  }
  toOnlinePage() {
    this.router.navigate(['/pageToApprove/onlinePages']);

  }
  goTo(clicked) {
    this.currentPath = clicked
    this.router.navigate(["/admin/pageToApprove/" + clicked])
  }

}
