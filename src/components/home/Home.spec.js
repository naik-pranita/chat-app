import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import io from 'socket.io-client';


describe('Home component', () => {

    beforeAll(() => {
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
});