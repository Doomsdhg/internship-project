import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardDialogContentComponent } from './guard-dialog-content.component';

describe('GuardDialogContentComponent', () => {
  let component: GuardDialogContentComponent;
  let fixture: ComponentFixture<GuardDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
