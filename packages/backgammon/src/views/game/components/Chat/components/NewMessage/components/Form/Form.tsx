import React from 'react';
import BootstrapForm from 'react-bootstrap/Form';
import { FiSend } from 'react-icons/fi';
import styles from './Form.module.css';

type BootstrapFormProps = React.ComponentProps<typeof BootstrapForm>;

const INITIAL_STATE = '';

export default function Form(
    props: Omit<BootstrapFormProps, 'onSubmit'> & {
        onSubmit: (m: string) => unknown;
    }
): React.ReactElement {
    const [message, setMessage] = React.useState(INITIAL_STATE);

    const { disabled, onSubmit, ..._props } = props;

    const formDisabled = disabled || !message;

    // Reset state on message sent
    React.useEffect(
        function onMessageSend() {
            disabled || setMessage(INITIAL_STATE);
        },
        [disabled]
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        props.onSubmit(message);
    };

    return (
        <BootstrapForm onSubmit={handleSubmit} {..._props}>
            <div className={styles.type_msg}>
                <div
                    className={`${styles.input_msg_write} d-flex align-items-center justify-content-between`}
                >
                    <input
                        disabled={disabled}
                        onChange={onChange}
                        type="text"
                        className="write_msg"
                        placeholder="Type a message"
                        value={message}
                    />
                    <button
                        disabled={formDisabled}
                        className={`${styles.msg_send_btn} d-flex align-items-center justify-content-center`}
                        type="submit"
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </BootstrapForm>
    );
}
