import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';

const ChatForm = ({ inputRef, onSubmit, onKeyUp }) => {
    return (
        <div className="container">
            <form name="chat-form" className="row chat-form" autoComplete="off" onSubmit={onSubmit} >
                <FormGroup>
                    <ControlLabel className="col-xs-12">Handle</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter avatar"
                        id="avatar"
                        className="col-xs-12"
                        inputRef={inputRef}
                        required
                    />
                    <ControlLabel className="col-xs-12">Message:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Type here..."
                        id="chat"
                        className="col-xs-12"
                        onKeyUp={onKeyUp}
                    />
                </FormGroup>
                <Button type="submit" className="col-xs-12" bsStyle="primary" >Send <Glyphicon glyph="send" /></Button>
            </form>
        </div>
    )
};

export default ChatForm;