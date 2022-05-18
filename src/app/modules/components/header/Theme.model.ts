import { HeaderConstants } from './header.constants';

export class Theme {

    name: string = HeaderConstants.AVAILABLE_THEMES.LIGHT.name;

    constructor(name: string) {
        this.name = name;
    }
}
