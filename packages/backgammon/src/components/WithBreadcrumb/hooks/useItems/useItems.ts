import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function useItems(url: string) {
    const { t } = useTranslation();

    const paths = url.split('/');
    // Delete path to locale page
    paths.shift();
    // Delete the current page.
    paths.pop();

    const items = paths.map((p, i) => {
        const shouldHome = i === 0;
        const to = '/' + paths.slice(0, i + 1).join('/');

        return {
            key: to,
            active: to === url,
            linkProps: { to },
            linkAs: Link,
            children: t(`links.${shouldHome ? 'home' : p}`),
        };
    });

    return items;
}
