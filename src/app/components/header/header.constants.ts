import { Theme } from './Theme.model';

class AvailableThemes {

  static readonly LIGHT: Theme = {
    name: 'light-theme'
  };
  static readonly DARK: Theme = {
    name: 'dark-theme'
  };
}

export class HeaderConstants {

  static readonly AVAILABLE_THEMES = AvailableThemes;
}
