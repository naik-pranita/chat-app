import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import io from 'socket.io-client';


describe('Home component', () => {

    beforeEach(() => {
        jest.spyOn(io, 'connect').mockReturnValue({
            on: jest.fn(),
            emit: jest.fn()
        })
    });

    it('should have default state set', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper.state()).toEqual({
            chat: [],
            avatar: '',
            typing: '',
            connectionId: ''
        });
    });

    it('should make socket connection', () => {
        const wrapper = shallow(<Home />);
        expect(io.connect).toHaveBeenCalledWith('http://localhost:9090');
    });
    
    it('should set up eent listeners for socket connection', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.instance().socket.on).toHaveBeenCalledTimes(3)
    });
    
});