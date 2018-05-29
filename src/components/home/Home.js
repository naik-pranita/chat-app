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
            msg: ''
        };

        this.avatarValue = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        this.setUpEventListeners();
    }

    setUpEventListeners() {
        this.socket.on('chat', (data) => {
            let chatArr = this.state.chat;
            chatArr.push(data);
            this.setState({ chat: this.translateData(chatArr), msg: '' });
        });

        this.socket.on('typing', (msg) => {
            this.setState({ msg });
        })
    }

    translateData(chat) {
        return chat.map(item => {
            if (item.avatar === this.avatarValue.value) {
                item.who = 'me';
            } else {
                item.who = 'other'
            }
            return item;
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.socket.emit('chat', { avatar: e.target.elements[0].value, chat: e.target.elements[1].value });
        e.target.elements[1].value = '';
    }

    onKeyUp(e) {
        if (![9, 13].includes(e.keyCode)) {
            this.socket.emit('typing', this.avatarValue.value);
        }
    }

    render() {
        return (
            <div>
                <ChatWindow message={this.state.msg} chat={this.state.chat} />
                <ChatForm onKeyUp={this.onKeyUp} onSubmit={this.handleSubmit} inputRef={ref => { this.avatarValue = ref; }} />
            </div>)
    }

}