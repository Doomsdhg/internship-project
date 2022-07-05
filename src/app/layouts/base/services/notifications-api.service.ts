import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { NotificationsAmountResponse, NotificationDto, NotificationsListResponse } from '../pages/components/notifications-dialog/notifications-dialog.interfaces';
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

  public getNotificationsAmount(): Observable<NotificationsAmountResponse> {
    return this.get<NotificationsAmountResponse>(
      ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
  }

  public updateServerData(notificationArray: NotificationDto[]): Observable<NotificationsListResponse> {
    return this.put<NotificationsListResponse, NotificationsReplenishRequest>(
      ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username),
      new NotificationsReplenishRequest(notificationArray, this.localStorageManagerService.getAuthenticationInfo()?.username)
    );
  }

  public nullifyNotificationsAmount(): Observable<NotificationsAmountResponse> {
    return this.patch<NotificationsAmountResponse, ReplenishNotViewedAmountRequest>(
      ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username),
      new ReplenishNotViewedAmountRequest(0)
    );
  }
}
