export interface UserInfo {
    firstName : string,
    secondName : string
}

export interface NotificationDto {
    user : UserInfo
    text : string,
    isReaded : string,
    isDeleted : string
}

export interface NotificationAmountResponse {
    amount: string
}

export interface NotificationsListResponse {
    notifications: NotificationDto[]
}