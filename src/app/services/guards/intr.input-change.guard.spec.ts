import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionsTableComponent } from '../../modules/components/transactions-table/intr.transactions-table.component';
import { NotifyService } from '../intr.notify.service';
import { TransactionApiService } from '../web-services/transaction-api.service';
import { InputChangeGuard } from './intr.input-change.guard';

describe('InputChangeGuard', () => {
  let guard: InputChangeGuard;
  let component: TransactionsTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        TransactionsTableComponent,
        TransactionApiService,
        NotifyService
      ]
    });
    guard = TestBed.inject(InputChangeGuard);
    component = TestBed.inject(TransactionsTableComponent);
  });

  it('should return false', () => {
    spyOn(guard.dialog, 'open').and.callThrough();
    component.transactionUpdateForm = new FormGroup({});
    spyOnProperty(component, 'inputChanged').and.returnValue(true);
    console.log(component.inputChanged);
    guard.canDeactivate(component);
    expect(guard.dialog.open).toHaveBeenCalled();
  });
});
