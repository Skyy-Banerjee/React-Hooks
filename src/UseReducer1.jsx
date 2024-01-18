import React, { useReducer } from 'react';
//Simple counter with useReducer()

const initialState = 0;

//reducer()
const reducer = (state, action) => {
	switch (action) {
		case 'increment':
			return state + 1;
		case 'decrement':
			return state - 1;
		case 'reset':
			return initialState;
		default:
			return state;
	}
};

function UseReducer1() {
	const [count, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			<h3>{count}</h3>
			<button onClick={() => dispatch('increment')}>Increment</button>
			<button onClick={() => dispatch('decrement')}>Decrement</button>
			<button onClick={() => dispatch('reset')}>Reset</button>
		</div>
	);
}

export default UseReducer1;
