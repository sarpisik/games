import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ROUTES } from '../../configs';
import { useTranslation } from 'react-i18next';

const LOCALES = ['en', 'tr'] as const;

export default function withLocaleGuard<Props extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithLocaleGuard(props: Props): React.ReactElement {
        const {
            match: { params },
            history,
        } = props;
        const { i18n } = useTranslation();

        // @ts-ignore
        const localeValid = LOCALES.includes(params.lang);

        React.useEffect(() => {
            // @ts-ignore
            if (localeValid) i18n.changeLanguage(params.lang);
            else history.replace(ROUTES.HOME);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [localeValid]);

        // @ts-ignore
        return localeValid ? <WrappedComponent {...props} /> : null;
    };
}
