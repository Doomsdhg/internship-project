import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppliedTransactionsListComponent } from './applied-transactions-list.component';

describe('AppliedTransactionsListComponent', () => {
  let component: AppliedTransactionsListComponent;
  let fixture: ComponentFixture<AppliedTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
