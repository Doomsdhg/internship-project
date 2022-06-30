import { Theme } from './theme.model';

class AvailableThemes {

  static readonly LIGHT: Theme = {
    name: 'light-theme'
  };
  static readonly DARK: Theme = {
    name: 'dark-theme'
  };
}

class ThemesIcons {

  static readonly LIGHT = 'light_mode';
  static readonly DARK = 'dark_mode';
}

export class HeaderConstants {

  static readonly AVAILABLE_THEMES = AvailableThemes;
  static readonly THEMES_ICONS = ThemesIcons;
}
