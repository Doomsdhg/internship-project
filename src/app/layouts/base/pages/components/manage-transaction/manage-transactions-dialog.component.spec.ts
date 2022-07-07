import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTransactionsDialogComponent } from './manage-transactions-dialog.component';

describe('ManageTransactionsDialogComponent', () => {
  let component: ManageTransactionsDialogComponent;
  let fixture: ComponentFixture<ManageTransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTransactionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
