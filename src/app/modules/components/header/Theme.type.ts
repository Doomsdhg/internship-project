import { HeaderConstants } from './header.constants';

export class Theme {

    name: string;

    constructor(name: string = HeaderConstants.AVAILABLE_THEMES.light.name) {
        this.name = name;
    }
}
