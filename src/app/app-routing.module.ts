import { NotificationsComponent } from './notifications/notifications.component';
import { PagesNotificationsComponent } from './pages-notifications/pages-notifications.component';
import { BookingNotificationComponent } from './booking-notification/booking-notification.component';
import { PendingPagesNotificationComponent } from './pending-pages-notification/pending-pages-notification.component';
import { OnlinePagesNotificationComponent } from './online-pages-notification/online-pages-notification.component';
import { DeclinedComponent } from './declined/declined.component';
import { BookedComponent } from './booked/booked.component';
import { PendingComponent } from './pending/pending.component';
import { NewNotificationComponent } from './new-notification/new-notification.component';
import { AuthGuard } from './auth/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from './admin/admin.component'
import { DetailsComponent } from './details/details.component';
import { ReportsComponent } from './reports/reports.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PageStatsComponent } from './page-stats/page-stats.component';
import { OverallStatsComponent } from './overall-stats/overall-stats.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: BookingNotificationComponent },
      { path: 'notif', component: NotificationsComponent },
      { path: 'reports', component: ReportsComponent, 
        children: [
          { path: '', component: PagesListComponent },
          { path: 'pageStats/:pageId/:pageTitle', component: PageStatsComponent },
          { path: 'overallStats', component: OverallStatsComponent },
        ], canActivate: [AuthGuard],
      },
      {
        path: 'bookingNotif', component: BookingNotificationComponent,
        children: [
          // { path: 'allNotif', component: AllNotifComponent, data: { isHidden: true } },
          { path: '', component: NewNotificationComponent },
          { path: 'new', component: NewNotificationComponent },
          { path: 'processing', component: PendingComponent },
          { path: 'booked', component: BookedComponent },
          { path: 'declined', component: DeclinedComponent },
        ], canActivate: [AuthGuard],
      },
      {
        path: 'pageToApprove', component: PagesNotificationsComponent,
        children: [
          { path: '', component: PendingPagesNotificationComponent },
          { path: 'pendingPages', component: PendingPagesNotificationComponent },
          { path: 'onlinePages', component: OnlinePagesNotificationComponent },
        ], canActivate: [AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }