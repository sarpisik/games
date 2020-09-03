import { Link } from 'react-router-dom';

export default function useItems(url: string) {
    const paths = url.split('/');

    const items = paths.map((p, i) => {
        const shouldHome = i === 0;
        const to = shouldHome ? '/' : paths.slice(0, i + 1).join('/');
        return {
            key: to,
            active: to === url,
            linkProps: { to },
            linkAs: Link,
            children: shouldHome ? 'home' : p,
        };
    });

    return items;
}
