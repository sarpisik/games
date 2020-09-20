import React from 'react';
import { Form } from './components';

type FormProps = React.ComponentProps<typeof Form>;
type Props = FormProps;

export default function Settings(props: Props): React.ReactElement {
    return <Form {...props} />;
}
