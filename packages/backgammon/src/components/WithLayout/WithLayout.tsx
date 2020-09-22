import React from 'react';
import Container from 'react-bootstrap/Container';
import { RouteComponentProps } from 'react-router-dom';

const CLASSNAMES = 'flex-grow-1 ';

export interface LayoutWrapperProps extends RouteComponentProps {
    setClassName: React.Dispatch<React.SetStateAction<string>>;
}

export function withLayout(options?: React.ComponentProps<typeof Container>) {
    return function withContainer<Props extends LayoutWrapperProps>(
        WrappedComponent: React.ComponentType<Props>
    ) {
        return function WithLayout(
            props: Omit<Props, 'setClassName'>
        ): React.ReactElement {
            const [className, setClassName] = React.useState(
                CLASSNAMES.concat(options?.className ?? '')
            );

            return (
                <Container {...options} className={className}>
                    <WrappedComponent
                        {...(props as Props)}
                        setClassName={setClassName}
                    />
                </Container>
            );
        };
    };
}
