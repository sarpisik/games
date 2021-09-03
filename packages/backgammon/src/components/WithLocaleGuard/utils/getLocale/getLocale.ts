const LOCALES = ['en', 'tr'];

export default function getLocale(pathname: string) {
    return pathname.split('/').find(pathOfLocale);
}

function pathOfLocale(path: string) {
    return LOCALES.includes(path);
}
