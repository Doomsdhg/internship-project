import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationAmountResponse, NotificationDto } from '../pages/components/notifications-dialog/notifications-dialog.interfaces';
import { BaseApiService } from './base-api.service';
import { ApiEndpoints } from 'src/app/constants/api-endpoints.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService extends BaseApiService {

  constructor(
    public http: HttpClient,
    private localStorageManagerService: LocalStorageManagerService) {
    super(http);
  }

  public getNotifications(): Observable<NotificationDto[]> {
    return this.get<NotificationDto[]>(
      ApiEndpoints.NOTIFICATIONS.getListUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
  }

  public getNotificationsAmount(): Observable<NotificationAmountResponse> {
    console.log(ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
    return this.get<NotificationAmountResponse>(
      ApiEndpoints.NOTIFICATIONS.getUnseenAmountUrl(this.localStorageManagerService.getAuthenticationInfo()?.username));
  }
}
