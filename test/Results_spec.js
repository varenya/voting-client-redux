import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument,scryRenderedDOMComponentsWithClass,Simulate } from 'react-addons-test-utils';
import { List, Map } from 'immutable';
import {Results} from '../src/components/Results';
import { expect } from 'chai';

describe('Results',() => {
	it('renders entry with vote counts or shows zero',() =>{
		const pair = List.of('Trainspotting','28 Days Later');
		const tally = Map({'Trainspotting':4});
		const component = renderIntoDocument(
			<Results tally={tally} pair={pair} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component,'entry');
		const [trains,days] = entries.map( e => e.textContent );

		expect(entries.length).to.equal(2);
		expect(trains).to.contain('Trainspotting');
		expect(trains).to.contain('4');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});

	it('it invokes the next callback when next button is clicked',() => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;
		const pair = List.of('Trainspotting','28 Days Later');
		const component = renderIntoDocument(
			<Results pair={pair}
				tally={Map()}
				next={next} />
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.next));
		expect(nextInvoked).to.equal(true);

	});
	it('it renders the winner when there is one',() => {
		const component = renderIntoDocument(
			<Results winner="Trainspotting" 
				 pair={["Trainspotting","28 Days Later"]}
				 tally={Map()} />
		);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});


	
});
