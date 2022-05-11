import {ApiEndpoints} from './api-endpoints.constants';
import {AppRoutes} from './app-routes.constants';
import {Columns} from './columns.constants';
import {Forms} from './forms.constants';
import {LocalStorageAcessors} from './local-storage-accessors.constants';
import {PageableDefaults} from './pageable.constants';
import {Snackbar} from './snackbar.constants';
import {SortingStrings} from './sorting.constants';
import {Styles} from './styles.constants';
import {Themes} from './themes.constants';
import {TranslationsEndpoints} from './translations-endpoints.constants';

export class Constants {
    static readonly API_ENDPOINTS = ApiEndpoints;
    static readonly APP_ROUTES = AppRoutes;
    static readonly COLUMNS = Columns;
    static readonly FORMS = Forms;
    static readonly LOCAL_STORAGE_ACCESSORS = LocalStorageAcessors;
    static readonly PAGEABLE_DEFAULTS = PageableDefaults;
    static readonly SNACKBAR = Snackbar;
    static readonly SORTING_STRINGS = SortingStrings;
    static readonly STYLES = Styles;
    static readonly THEMES = Themes;
    static readonly TRANSLATIONS_ENDPOINTS = TranslationsEndpoints;
}
