"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var notifications_dialog_component_1 = require("src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.component");
var header_constants_1 = require("./header.constants");
var theme_model_1 = require("./theme.model");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, changeDetectorRef, authService, localStorageManagerService, themeManagerService, matDialog, notificationsApiService) {
        this.router = router;
        this.changeDetectorRef = changeDetectorRef;
        this.authService = authService;
        this.localStorageManagerService = localStorageManagerService;
        this.themeManagerService = themeManagerService;
        this.matDialog = matDialog;
        this.notificationsApiService = notificationsApiService;
        this.PANEL_CLASS = 'notifications-dialog';
        this.BACKDROP_CLASS = 'notification-backdrop';
    }
    Object.defineProperty(HeaderComponent.prototype, "isAuthenticated", {
        get: function () {
            var _a;
            return Boolean((_a = this.localStorageManagerService.getAuthenticationInfo()) === null || _a === void 0 ? void 0 : _a.authenticated);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "isDarkTheme", {
        get: function () {
            return this.currentTheme.name === header_constants_1.HeaderConstants.AVAILABLE_THEMES.DARK.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "isLightTheme", {
        get: function () {
            return this.currentTheme.name === header_constants_1.HeaderConstants.AVAILABLE_THEMES.LIGHT.name;
        },
        enumerable: false,
        configurable: true
    });
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function () {
            _this.setCurrentRoute();
        });
        this.setCurrentTheme();
        this.getUnseenNotificationsAmount();
    };
    HeaderComponent.prototype.redirectTo = function (route) {
        this.router.navigate([route]);
    };
    HeaderComponent.prototype.enableLightTheme = function () {
        this.changeTheme(header_constants_1.HeaderConstants.AVAILABLE_THEMES.LIGHT);
    };
    HeaderComponent.prototype.enableDarkTheme = function () {
        this.changeTheme(header_constants_1.HeaderConstants.AVAILABLE_THEMES.DARK);
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderComponent.prototype.handleBellClick = function () {
        this.openNotificationsDialog();
        this.nullifyUnseenNotificationsAmount();
    };
    HeaderComponent.prototype.getUnseenNotificationsAmount = function () {
        var _this = this;
        this.notificationsApiService.getNotificationsAmount()
            .subscribe(function (response) {
            _this.unseenNotificationsAmount = +response.amount;
        });
    };
    HeaderComponent.prototype.nullifyUnseenNotificationsAmount = function () {
        var _this = this;
        this.notificationsApiService.nullifyUnseenNotificationsAmount()
            .subscribe(function (success) {
            _this.unseenNotificationsAmount = +success.amount;
            _this.changeDetectorRef.detectChanges();
        });
    };
    HeaderComponent.prototype.openNotificationsDialog = function () {
        this.matDialog.open(notifications_dialog_component_1.NotificationsDialogComponent, {
            panelClass: this.PANEL_CLASS,
            backdropClass: this.BACKDROP_CLASS
        });
    };
    HeaderComponent.prototype.setCurrentTheme = function () {
        var previouslySelectedThemeName = this.localStorageManagerService.chosenTheme;
        var defaultThemeName = header_constants_1.HeaderConstants.AVAILABLE_THEMES.LIGHT.name;
        this.currentTheme = new theme_model_1.Theme(previouslySelectedThemeName || defaultThemeName);
    };
    HeaderComponent.prototype.changeTheme = function (selectedTheme) {
        this.currentTheme = selectedTheme;
        this.localStorageManagerService.setNewTheme(selectedTheme.name);
        this.themeManagerService.passNewTheme(selectedTheme.name);
    };
    HeaderComponent.prototype.setCurrentRoute = function () {
        this.currentRoute = String(window.location.href);
        this.changeDetectorRef.markForCheck();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'intr-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
