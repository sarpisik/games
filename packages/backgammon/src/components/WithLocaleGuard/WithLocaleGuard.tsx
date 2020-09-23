import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../configs';
import { getLocale } from './utils';

export default function withLocaleGuard<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithLocaleGuard(props: Props): React.ReactElement {
        const history = useHistory();
        const location = useLocation();
        const { i18n } = useTranslation();

        const locale = getLocale(location.pathname);
        const homePage = location.pathname === ROUTES.HOME;
        const shouldRenderComponent = locale || homePage;

        React.useEffect(() => {
            if (locale) i18n.changeLanguage(locale);
            else if (!homePage) history.replace(ROUTES.HOME);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [homePage, locale]);

        // Ignore return type null
        // @ts-ignore
        return shouldRenderComponent ? <WrappedComponent {...props} /> : null;
    };
}
