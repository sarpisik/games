import React, { ReactElement } from 'react';
import { Form } from './components';

type FormProps = React.ComponentProps<typeof Form>;
type Props = FormProps;

export default function Settings(props: Props): ReactElement {
    return (
        <React.Fragment>
            <Form {...props} />
        </React.Fragment>
    );
}
