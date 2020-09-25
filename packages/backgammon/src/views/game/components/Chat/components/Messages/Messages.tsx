import React from 'react';
import { animateScroll } from 'react-scroll';
import { useGame } from '../../../../../../app/slices';
import { Message } from './components';

export default function Messages(): React.ReactElement {
    const { game } = useGame();
    const { messages } = game.chat;

    React.useEffect(
        function scrollToTopOnNewMessage() {
            animateScroll.scrollToTop({
                containerId: 'messages-container',
            });
        },
        [messages]
    );

    return (
        <div id="messages-container" className="flex-grow-1 overflow-auto">
            {messages.map(Message)}
        </div>
    );
}
