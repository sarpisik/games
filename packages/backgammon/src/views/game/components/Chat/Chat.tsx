import React from 'react';
import { Message, NewMessage } from './components';

type MessageProps = React.ComponentProps<typeof Message>;
const messages: MessageProps[] = [
    {
        name: 'Sarp',
        message:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nemo assumenda veritatis maxime minus, sit officia doloribus! Aut officiis alias laudantium ad quo ex, neque pariatur dolores. Tempora, ad in?',
        time: Date.now(),
    },
    {
        name: 'Maja',
        message:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nemo assumenda veritatis maxime minus, sit officia doloribus! Aut officiis alias laudantium ad quo ex, neque pariatur dolores. Tempora, ad in?',
        time: Date.now(),
    },
    {
        name: 'Sarp',
        message:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nemo assumenda veritatis maxime minus, sit officia doloribus! Aut officiis alias laudantium ad quo ex, neque pariatur dolores. Tempora, ad in?',
        time: Date.now(),
    },
    {
        name: 'Maja',
        message:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nemo assumenda veritatis maxime minus, sit officia doloribus! Aut officiis alias laudantium ad quo ex, neque pariatur dolores. Tempora, ad in?',
        time: Date.now(),
    },
    {
        name: 'Sarp',
        message:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nemo assumenda veritatis maxime minus, sit officia doloribus! Aut officiis alias laudantium ad quo ex, neque pariatur dolores. Tempora, ad in?',
        time: Date.now(),
    },
];

export default function Chat(): React.ReactElement {
    return (
        <div className="d-flex flex-column h-100">
            <div className="overflow-auto">{messages.map(Message)}</div>
            <NewMessage className="flex-grow-1" />
        </div>
    );
}
