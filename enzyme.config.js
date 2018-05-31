import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


process.on('unhandledRejection', (reason) => {
	console.log('REJECTION', reason)
})