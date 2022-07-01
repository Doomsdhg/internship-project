import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { NotificationAmountResponse, NotificationDto, NotificationsListResponse } from '../pages/components/notifications-dialog/notifications-dialog.interfaces';
import { BaseApiService } from './base-api.service';
import { ReplenishNotViewedAmountRequest } from './classes/replenish-notifications-amount.class';
import { NotificationsReplenishRequest } from './classes/replenish-notifications.class';

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService extends BaseApiService {

  constructor(
    public http: HttpClient,
    private localStorageManagerService: LocalStorageManagerService) {
    super(http);
  }

  public getNotifications(): Observable<NotificationsListResponse> {
    return this.get<NotificationsListResponse>(
      ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
  }

  public getNotificationsAmount(): Observable<NotificationAmountResponse> {
    return this.get<NotificationAmountResponse>(
      ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
  }

  public updateNotificationsServerData(notificationArray: NotificationDto[]): Observable<NotificationsListResponse> {
    return this.put<NotificationsListResponse>(
      ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username),
      new NotificationsReplenishRequest(notificationArray, this.localStorageManagerService.getAuthenticationInfo()?.username)
    );
  }

  public nullifyNotificationsAmount(): Observable<NotificationAmountResponse> {
    return this.patch<NotificationAmountResponse>(
      ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username),
      new ReplenishNotViewedAmountRequest(0)
    );
  }
}
