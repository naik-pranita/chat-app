import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Panel, Glyphicon, Label } from 'react-bootstrap';
import io from 'socket.io-client';

import ChatForm from '../chat-form/ChatForm';
import ChatWindow from '../chat-window/ChatWindow';

export default class Home extends Component {
    constructor() {
        super();
        this.socket = io.connect('http://localhost:9090');
        this.state = {
            chat: [],
            avatar: '',
            typing: '',
            connectionId: ''
        };

        this.emitChat = this.emitChat.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        this.setUpEventListeners();
    }

    setUpEventListeners() {
        this.socket.on('connection-success', (connectionId) => {
            this.setState({ connectionId });
        });

        this.socket.on('chat', (data) => {
            let chat = this.state.chat;
            chat.push(data);
            this.setState({ chat: this.translateData(chat), typing: '' });
        });

        this.socket.on('typing', (typing) => {
            this.setState({ typing });
        });
    }

    translateData(chat) {
        return chat.map(item => {
            if (item.id === this.state.connectionId) {
                item.who = 'me';
            } else {
                item.who = 'other'
            }
            return item;
        });
    }

    emitEvent(eventName, data, callback) {
        this.socket.emit(eventName, data, callback);
    }

    emitChat(data) {
        this.emitEvent('chat', data);
    }

    onKeyUp(avatar) {
        this.emitEvent('typing', avatar, (avatar) => {
            this.setState({ avatar });
        });
    }

    render() {
        return (
            <div>
                <ChatWindow message={this.state.typing} chat={this.state.chat} />
                <ChatForm onKeyUp={this.onKeyUp} onSubmit={this.emitChat} emitEvent={this.emitEvent}/>
            </div>
        )
    }
}
