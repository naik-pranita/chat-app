import React, { Component } from 'react';

import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';

export default class ChatForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onKeyUp(e) {
        if (![9, 13].includes(e.keyCode)) {
            this.props.onKeyUp(this.state.avatar);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ message: '' });
    }

    render() {
        return (
            <div className="container">
                <form name="chat-form" className="row chat-form" autoComplete="off" onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <ControlLabel className="col-xs-12">Handle</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter name"
                            id="avatar"
                            className="col-xs-12"
                            name="avatar"
                            value={this.state.avatar}
                            onChange={this.onChange}
                            required
                        />
                        <ControlLabel className="col-xs-12">Message:</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Type here..."
                            id="chat"
                            className="col-xs-12"
                            name="message"
                            value={this.state.message}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                        />
                    </FormGroup>
                    <Button type="submit" className="col-xs-12" bsStyle="primary" >Send <Glyphicon glyph="send" /></Button>
                </form>
            </div>
        )
    };
}