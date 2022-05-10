import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { Themes } from 'src/app/constants/themes.constants';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const testingPageRoute = 'http://localhost:9876/context.html';
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatMenuModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set theme to dark', () => {
    localStorage.setItem(LocalStorageAcessors.THEME, Themes.DARK);
    component.setTheme();
    expect(component.theme).toBe(Themes.DARK);
  });

  it('should set components property `route` to current route', () => {
    component.setCurrentRoute();
    expect(component.currentRoute).toBe(testingPageRoute);
  });

  it('should theme from dark to light', () => {
    component.theme = Themes.DARK;
    component.switchTheme();
    expect(component.theme).toBe(Themes.LIGHT);
  });
});
