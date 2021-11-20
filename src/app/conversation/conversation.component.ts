import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../service/admin.service';
export interface message {
  _id: string;
  sender: string;
  senderFullName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  noSender: boolean
}
export interface conversation {
  _id: string;
  page: any;
  booking: any;
  messages: message[];
  createdAt: string;
  updatedAt: string;
  opened: boolean;
}

export enum receiver {
  owner = "owner",
  admin = "admin"
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @ViewChild('messagesCont') public messagesContainer: ElementRef;
  public screenHeight: number;
  public message: string;
  @Input() bookingId: string;
  @Input() pageId: string;
  @Input() tourist: string;
  showGoToBottom = true;
  public conversation: conversation;
  public messages: any[] = []
  constructor(public route: ActivatedRoute, public mainService: AdminService) { }

  ngOnInit() {
    this.screenHeight = window.innerHeight - 190
    if (this.bookingId) {
      this.mainService.getConversation(this.bookingId, this.pageId, this.mainService.user._id).subscribe(
        (response: any) => {
          if (!response.noConversation) {
            this.conversation = response
            this.messages = this.conversation.messages
            this.formatData()
          }

          setTimeout(() => {
            this.scrollToBottom()
          }, 400)
        }
      )
    } else {
      // this.receiver = params.receiverName
      this.mainService.getConvoForPageSubmission(this.pageId, "admin_approval").subscribe(
        (response: any) => {
          if (!response.noConversation) {
            this.conversation = response
            this.messages = this.conversation.messages
            this.formatData()
          }

          setTimeout(() => {
            this.scrollToBottom()
          }, 400)
        }
      )
    }

    this.mainService.notification.subscribe(
      (data: any) => {
        if ((data.type == "message-booking" && this.bookingId == data.bookingId) || (data.type == "message-page" && data.pageId == this.pageId && data.receiver.includes(this.mainService.user._id))) {
          if (this.conversation && data.conversationId != this.conversation._id) return;
          if (data.conversation) {
            this.conversation = data.conversation
            this.messages = this.conversation.messages
            this.formatData()

          } else {
            if (this.conversation._id == data.conversationId) {

              const message = this.messages.filter(m => m._id == data.newMessage._id)
              if (message.length == 0) this.messages.push(data.newMessage);
            }
          }
          setTimeout(() => {
            this.scrollToBottom()
          }, 400)
        } else {
        }
      }
    )

    this.mainService.viewConversation.subscribe(data => {
      setTimeout(() => {
        this.scrollToBottom()
       
      }, 500)
    })
  }


  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollTop + this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  send() {
    const notificationData = {
      receiver: this.tourist,
      mainReceiver: this.tourist,
      page: this.pageId,
      booking: this.bookingId,
      sender: this.mainService.user._id,
      isMessage: true,
      subject: this.bookingId,
      message: 'Admin sent you a message',
      type: this.bookingId ? "booking-tourist" : "page-provider",
    }
    if (this.message) { 
      if (!this.conversation) {
        if (!this.bookingId) {

          const data = { notificationData: notificationData, booking: null, page: this.pageId, message: this.message, type: "admin_approval", receiver:this.tourist }
          this.mainService.createConvoForPageSubmission(data).subscribe(
            (response: any) => {
              if (!response.noConversation) {
                this.conversation = response
                this.messages = this.conversation.messages
                this.formatData();
                this.scrollToBottom()
                this.mainService.notify({ user: this.mainService.user, pageId: this.pageId, conversation: this.conversation, type: "message-page", receiver: [this.tourist], message: `You have new message` })
              }
            }
          )
        } else {
          const data = { notificationData: notificationData,fromAdmin: true, booking: this.bookingId, page: this.pageId, message: this.message, receiver: this.mainService.user._id }
          this.mainService.createConversation(data).subscribe(
            (response: any) => {
              if (!response.noConversation) {
                this.conversation = response
                this.messages = this.conversation.messages
                this.formatData();
                this.scrollToBottom()
              this.mainService.notify({ user: this.mainService.user, bookingId: this.bookingId, conversation: this.conversation, type: "message-booking", receiver: [this.tourist], message: `You have new message` })
              }
            }
          )
        }
      } else {
        const pageConvo = !this.bookingId ? true: false
        const data = {pageConvo: pageConvo,fromAdmin: true, notificationData: notificationData, conversationId: this.conversation._id, message: this.message }
        const message = { createdAt: "Sending...", sender: this.mainService.user._id, noSender: true, message: this.message }
        this.messages.push(message)
        setTimeout(() => {
          this.scrollToBottom()
        }, 200)
        this.mainService.sendMessage(data).subscribe(
          (response: conversation) => {
            this.conversation = response
            this.messages = this.conversation.messages
            this.formatData()
            this.scrollToBottom()
            this.mainService.notify({ user: this.mainService.user, bookingId: this.bookingId, pageId: this.pageId, conversationId: this.conversation._id, newMessage: this.messages[this.messages.length - 1], type: !this.bookingId ? "message-page" : "message-booking", receiver: [this.tourist], message: `You have new message` })
          }
        )
      }
      this.message = ""
    }
  }

  formatData() {
    for (let i = 0; i < this.messages.length; ++i) {
      if (i != 0 && this.messages[i - 1].sender == this.messages[i].sender) {
        this.messages[i]["noSender"] = true
      }
    }
  }
}

