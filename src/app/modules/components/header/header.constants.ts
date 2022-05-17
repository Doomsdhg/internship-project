import { Theme } from './Theme.type';

export class HeaderConstants {

    static readonly AVAILABLE_THEMES: {light: Theme, dark: Theme} = {
        light: {
          name: 'light-theme'
        },
        dark: {
          name: 'dark-theme'
        }
      };
}
