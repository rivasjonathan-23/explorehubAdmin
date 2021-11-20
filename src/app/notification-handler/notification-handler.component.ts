import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AdminService } from '../service/admin.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-notification-handler',
  templateUrl: './notification-handler.component.html',
  styleUrls: ['./notification-handler.component.css']
})
export class NotificationHandlerComponent {
  public user: any;
  constructor(private socket: Socket,
    public adminService: AdminService,
  ) { }



  init() {  
    const token = localStorage.getItem("token")
    const user = jwt_decode(token);
    this.user = user;
    this.socket.connect();
    this.adminService.socket = this.socket;
    this.adminService.user = this.user
    this.adminService.notify = this.notify
    this.socket.fromEvent('send-notification').subscribe((data: any) => {
      if (data.receiver.includes("admin") || data.receiver.includes(this.adminService.user._id)) {
        // if (data.user._id != this.user._id) {
        //   // this.showToast(data.message);
        // }
        this.adminService.receiveNotification(data)
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  notify(data) {
    const date = new Date()
    const notifId = "notif" + date.getHours() + date.getMinutes() + date.getMilliseconds();
    data["notifId"] = notifId
    this.socket.emit('notify', data)
   
  }
}

