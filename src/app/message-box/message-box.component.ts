import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  @Input() position: string = "left";
  showDate = false;
  @Input() message: any = {
    _id: "", sender: "",withMedia: false, senderFullName: "", message: "", createdAt: null, updatedAt: null, noSender: false
  }
  constructor(
    public adminService:AdminService,
    private sanitizer: DomSanitizer
  ) { 

  }

  ngOnInit() {
    if (this.message.withMedia || this.message.message.includes("<div data-page=")) {
      this.message.withMedia = true
      this.message.message = this.sanitizer.bypassSecurityTrustHtml(this.message.message)
    }
  }

}
