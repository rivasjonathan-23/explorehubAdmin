import { AdminService } from './service/admin.service';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { FilterPipe } from './pipes/filter.pipe';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';



import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { PendingComponent } from './pending/pending.component';
import { BookedComponent } from './booked/booked.component';
import { DeclinedComponent } from './declined/declined.component';
import { PendingDetailsComponent } from './pending-details/pending-details.component';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { BookedDetailsComponent } from './booked-details/booked-details.component';
import { DeclinedDetailsComponent } from './declined-details/declined-details.component';
import { NotifDetailsComponent } from './notif-details/notif-details.component';
import { OnlinePagesNotificationComponent } from './online-pages-notification/online-pages-notification.component';
import { PendingPagesNotificationComponent } from './pending-pages-notification/pending-pages-notification.component';
import { BookingNotificationComponent } from './booking-notification/booking-notification.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PagesNotificationsComponent } from './pages-notifications/pages-notifications.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotificationHandlerComponent } from './notification-handler/notification-handler.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsComponent } from './reports/reports.component';
import { PageStatsComponent } from './page-stats/page-stats.component';
import { OverallStatsComponent } from './overall-stats/overall-stats.component';
import { PagesListComponent } from './pages-list/pages-list.component'; 
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
const config: SocketIoConfig = { url:environment.apiUrl, options: {} };

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    NewNotificationComponent,
    PendingComponent,
    BookedComponent,
    DeclinedComponent,
    PendingDetailsComponent,
    MatDialogComponent,
    BookedDetailsComponent,
    DeclinedDetailsComponent,
    NotifDetailsComponent,
    OnlinePagesNotificationComponent,
    PendingPagesNotificationComponent,
    BookingNotificationComponent,
    NotificationsComponent,
    PagesNotificationsComponent,
    MessageBoxComponent,
    NotificationHandlerComponent,
    ConversationComponent,
    NotificationCardComponent,
    AdminComponent,
    ReportsComponent,
    PageStatsComponent,
    OverallStatsComponent,
    PagesListComponent,
    // FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SocketIoModule.forRoot(config)
    // Pusher
  ],
  providers: [
    AdminService,
    MatDatepickerModule,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatDialogComponent]
})
export class AppModule { }