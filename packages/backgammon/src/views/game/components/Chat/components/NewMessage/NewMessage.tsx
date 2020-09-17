import React from 'react';
import Form from 'react-bootstrap/Form';
import { FiSend } from 'react-icons/fi';
import styles from './NewMessage.module.css';

export default function NewMessage(
    props: Omit<React.ComponentProps<typeof Form>, 'onSubmit'>
): React.ReactElement {
    const [message, setMessage] = React.useState('');

    const disabled = !message;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const send = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(message);
    };

    return (
        <Form onSubmit={send} {...props}>
            <div className={styles.type_msg}>
                <div
                    className={`${styles.input_msg_write} d-flex align-items-center justify-content-between`}
                >
                    <input
                        onChange={onChange}
                        type="text"
                        className="write_msg"
                        placeholder="Type a message"
                        value={message}
                    />
                    <button
                        disabled={disabled}
                        className={`${styles.msg_send_btn} d-flex align-items-center justify-content-center`}
                        type="submit"
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </Form>
    );
}
