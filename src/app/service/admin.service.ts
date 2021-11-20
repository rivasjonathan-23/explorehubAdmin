
import { Observable, BehaviorSubject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // public userIDToken = "";private helper: JwtHelperService,
  private apiUrl = `${environment.apiUrl}api/admin`;
  public currentPath: string;
  public bookingId: string;
  public socket: any;
  public user: any;
  public notify: any;
  public notification: EventEmitter<any> = new EventEmitter();
  public updatePendingBookingCount: EventEmitter<any> = new EventEmitter();
  public updatePendingPagesCount: EventEmitter<any> = new EventEmitter();
  public updateNotificationCount: EventEmitter<any> = new EventEmitter();
  public changeMainTab: EventEmitter<any> = new EventEmitter();
  public processingTimeEnded: EventEmitter<any> = new EventEmitter();
  public loggedInAdmin: EventEmitter<any> = new EventEmitter();
  public loggedOutAdmin: EventEmitter<any> = new EventEmitter();
  public changeTab: EventEmitter<any> = new EventEmitter();
  public viewConversation: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
  }
  receiveNotification(data) {
    this.notification.emit(data);
  }

  login(credentials) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    const token = localStorage.getItem('token');
    if (token) {
      // atob function will return an array of spliting the jwt based on a dot...array that contains three items, the second array will develop
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }
  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  getAllBookings(bookingStatus) {
    return this.http.get(`${this.apiUrl}/getAllBookings/${bookingStatus}`);
  }
  // getOnProcessBooking(bookingId){
  //   return this.http.get(`${this.apiUrl}/getOnProcessBooking/${bookingId}`);
  // }
  // getBookedDetails(bookingId){
  //   return this.http.get(`${this.apiUrl}/getBookedDetails/${bookingId}`);
  // }
  // getDeclineBookings(bookingId){
  //   return this.http.get(`${this.apiUrl}/getDeclineBookings/${bookingId}`);
  // }
  // getPendingBookings(bookingId){
  //   return this.http.get(`${this.apiUrl}/getPendingBookings/${bookingId}`);
  // }
  getAllPendingNotifications(pageStatus) {
    return this.http.get(`${this.apiUrl}/getAllPendingNotifications/${pageStatus}`)
  }
  getPagesList(pageStatus) {
    return this.http.get(`${this.apiUrl}/getPagesList/${pageStatus}`)
  }
  //getPagesList
  // getProcessPage(pageId){
  //   return this.http.get(`${this.apiUrl}/getProcessPage/${pageId}`)
  // }
  // getOnlinePage(pageId){
  //   return this.http.get(`${this.apiUrl}/getOnlinePage/${pageId}`)
  // }

  getPendingPagesCount() {
    return this.http.get(`${this.apiUrl}/getPendingPagesCount`)
  }

  getPendingBookingsCount() {
    return this.http.get(`${this.apiUrl}/getPendingBookingsCount`)
  }

  getNotificationCount() {
    let token = localStorage.getItem("token")
    return this.http.get(`${this.apiUrl}/getNotificationCount`, { headers: { authorization: `bearer ${token}` } })
  }

  setPageStatus(data) {
    let token = localStorage.getItem("token")
    return this.http.post(`${this.apiUrl}/setPageStatus`, data, { headers: { authorization: `bearer ${token}` } })
  }
  
  setBookingStatus(data) {
    let token = localStorage.getItem("token")
    return this.http.post(`${this.apiUrl}/setBookingStatus`, data, { headers: { authorization: `bearer ${token}` } })
  }

  getBooking(bookingId) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.get(`${apiUrl}/service-provider/viewBooking/${bookingId}`, { headers: { authorization: `bearer ${token}` } })
  }

  getApiUrlAndToken() {
    let url = this.apiUrl.split("/")
    url.splice(url.length - 1, 1)
    let apiUrl = url.join("/")
    let token = localStorage.getItem("token")
    return { apiUrl, token }
  }

  createConversation(data) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.post(`${apiUrl}/service-provider/createConversation`, data, { headers: { authorization: `bearer ${token}` } })
  }

  getConversation(bookingId, pageId, receiver) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.get(`${apiUrl}/service-provider/getConversation/${bookingId}/${pageId}/${receiver}`, { headers: { authorization: `bearer ${token}` } })
  }

  sendMessage(data: any) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.post(`${apiUrl}/service-provider/sendMessage`, data, { headers: { authorization: `bearer ${token}` } })
  }

  getNotifications() {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.get(`${apiUrl}/service-provider/getNotifications`, { headers: { authorization: `bearer ${token}` } })
  }

  viewNotification(data) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.put(`${apiUrl}/service-provider/viewNotification`, data, { headers: { authorization: `bearer ${token}` } })
  }

  getConvoForPageSubmission(pageId, type) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.get(`${apiUrl}/service-provider/getConvoForPageSubmission/${pageId}/${type}`, { headers: { authorization: `bearer ${token}` } })
  }

  createConvoForPageSubmission(data) {
    const { apiUrl, token } = this.getApiUrlAndToken();
    return this.http.post(`${apiUrl}/service-provider/createConvoForPageSubmission`, data, { headers: { authorization: `bearer ${token}` } })
  }

  getPageBookings(pageId:string) {
    const { apiUrl, token} = this.getApiUrlAndToken()
    return this.http.get(`${apiUrl}/admin/getPageBookings/${pageId}`, { headers: { authorization: `bearer ${token}` } })
  }

  getAllExplorehubBooking() {
    const { apiUrl, token} = this.getApiUrlAndToken()
    return this.http.get(`${apiUrl}/admin/getAllExplorehubBooking/`, { headers: { authorization: `bearer ${token}` } })
  }

}

