import { HttpStatusCode } from 'src/app/enums/HttpStatusCode';

class Links {

    static readonly BASE_SVG_LINK = '/app/assets/svg/';
    static readonly NOT_FOUND_IMAGE_LINK = `${this.BASE_SVG_LINK}404.svg`;
    static readonly INTERNAL_SERVER_ERROR_IMAGE_LINK = `${this.BASE_SVG_LINK}500.svg`;

    static readonly getErrorImageLink = (errorCode: number): string => {
        switch (errorCode) {
            case HttpStatusCode.NOT_FOUND:
                return this.NOT_FOUND_IMAGE_LINK;
            default:
                return this.INTERNAL_SERVER_ERROR_IMAGE_LINK;
        }
    }
}

class ClassName {

    static readonly IMAGE_CLASS_POSTFIX = '-image';
    static readonly NOT_FOUND_CLASS = `not-found${this.IMAGE_CLASS_POSTFIX}`;
    static readonly INTERNAL_SERVER_ERROR_CLASS = `internal-server-error${this.IMAGE_CLASS_POSTFIX}`;

    static readonly getErrorImageClass = (errorCode: number): string => {
        switch (errorCode) {
            case HttpStatusCode.NOT_FOUND:
                return `${this.NOT_FOUND_CLASS}`;
            default:
                return `${this.INTERNAL_SERVER_ERROR_CLASS}`;
        }
    }
}

export class ErrorPageConstants {

    static readonly IMAGES_LINKS = Links;
    static readonly CLASS_NAME = ClassName;
}
