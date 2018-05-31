import React from 'react';
import { Label, Panel } from 'react-bootstrap';

const ChatWindow = ({ message, chat }) => {
    return (
        <div id="chat-window" className="chat-window">
            <Label bsStyle="info">{message}</Label>
            {chat.map((item, idx) => (
                <div key={idx} className={`chat-item-container chat-item-container-${item.who}`}>
                    <Panel className={`panel-default-${item.who}`}>
                        <Panel.Heading>{item.avatar}</Panel.Heading>
                        <Panel.Body>{item.message}</Panel.Body>
                    </Panel>
                </div>
            ))}
        </div>
    )
};

export default ChatWindow;