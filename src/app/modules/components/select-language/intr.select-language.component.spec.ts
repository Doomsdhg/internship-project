import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { environment } from 'src/environments/environment';

import { SelectLanguageComponent } from './select-language.component';

describe('SelectLanguageComponent', () => {
  let component: SelectLanguageComponent;
  let fixture: ComponentFixture<SelectLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectLanguageComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change language and reload page', () => {
    spyOn(component, 'reloadCurrentPage').and.callFake(() => {
      return;
    });
    component.selectLanguageForm = new FormControl(environment.defaultLocale);
    component.changeLanguage();
    console.log();
    expect(localStorage.getItem(LocalStorageAcessors.LANGUAGE)).toBe('en');
    expect(component.reloadCurrentPage).toHaveBeenCalled();
  });
});
