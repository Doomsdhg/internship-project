import { Component, OnInit } from '@angular/core';
import { HttpStatusCode } from './../../../../enums/HttpStatusCode';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

  notFoundError = false;

  internalServerError = false;

  constructor(
    private localStorageManagerService: LocalStorageManagerService) { }

  ngOnInit(): void {
    this.notFoundError = this.localStorageManagerService.error === HttpStatusCode.NOT_FOUND ? true : false;
    this.internalServerError = this.localStorageManagerService.error === HttpStatusCode.INTERNAL_SERVER_ERROR ? true : false;
  }
}
