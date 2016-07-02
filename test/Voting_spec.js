import {Voting} from '../src/components/Voting';
import { renderIntoDocument,scryRenderedDOMComponentsWithTag,Simulate } from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';

describe('Voting', () => {

	it('renders a pair of buttons',() =>{
		const component = renderIntoDocument(
			<Voting pair ={['Trainspotting','28 Days Later']} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Trainspotting');
		expect(buttons[1].textContent).to.equal('28 Days Later');
	});

	it('invokes a callback when clicked',() => {
		let voteWith;
		const vote = function(entry){
			voteWith = entry;
		}
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting','28 Days Later']} vote={vote} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[0]);
		expect(voteWith).to.equal('Trainspotting');
	});

	it('is disabled when already voted',() =>{
		let voteWith;
		const vote = function(entry){
			voteWith = entry;
		}
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting','28 Days Later']} vote={vote} hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);

	});

	it('adds a label Voted when its already voted',() => {
		let voteWith;
		const vote = function(entry){
			voteWith = entry;
		}
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting','28 Days Later']} vote={vote} hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('shows a winner when a winner props is passed',() => {
		let voteWith;
		const vote = function(entry){
			voteWith = entry;
		}
		const component = renderIntoDocument(
			<Voting winner="Trainspotting"/>
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);

		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');



	});

	it('renders as a pure component', () => {
		const pair = ['Trainspotting', '28 Days Later'];
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
				container
		);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Sunshine';
		component = ReactDOM.render(
			<Voting pair={pair} />,
				container
		);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');
});	

});
