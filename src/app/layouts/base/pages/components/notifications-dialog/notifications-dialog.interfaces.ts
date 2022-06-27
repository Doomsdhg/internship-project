export interface UserInfo {
    firstName : string,
    secondName : string
}

export interface NotificationDto {
    user : UserInfo
    text : string,
    isRead : string,
    isDeleted : string
}

export interface NotificationAmountResponse {
    amount: string
}

export interface NotificationsListResponse {
    id: string;
    notifications: NotificationDto[]
}