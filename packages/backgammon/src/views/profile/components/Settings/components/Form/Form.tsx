import React from 'react';
import Col from 'react-bootstrap/Col';
import F from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { User } from '../../../../../../types/user';
import { DeleteUser, Submit } from './components';
import { useFormState } from './hooks';
import { transformToInitialstate } from './utils';

interface Props {
    user: User;
}

export default function Form(props: Props): React.ReactElement {
    const formState = useFormState(transformToInitialstate(props.user));
    const { user, onChange, onSubmit } = formState;

    return (
        <F onSubmit={onSubmit}>
            <F.Group as={Row} controlId="exampleF.ControlInput1">
                <F.Label column sm="2">
                    Name
                </F.Label>
                <Col sm="10">
                    <F.Control
                        onChange={onChange}
                        name="name"
                        value={user.name}
                    />
                </Col>
            </F.Group>
            <F.Group as={Row} controlId="exampleF.ControlInput2">
                <F.Label column sm="2">
                    Description
                </F.Label>
                <Col sm="10">
                    <F.Control
                        onChange={onChange}
                        name="description"
                        value={user.description}
                    />
                </Col>
            </F.Group>
            <Submit className="mr-3" />
            <DeleteUser />
        </F>
    );
}
