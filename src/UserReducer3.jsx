import React, { useReducer } from 'react';
//Multiple useReducers() making use of the same reducer fx()

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

function UseReducer3() {
	const [count, dispatch] = useReducer(reducer, initialState);
	const [count2, dispatch2] = useReducer(reducer, initialState);
	return (
		<div>
			<div>
				<h3>Count - {count}</h3>
				<button onClick={() => dispatch('increment')}>Increment</button>
				<button onClick={() => dispatch('decrement')}>Decrement</button>
				<button onClick={() => dispatch('reset')}>Reset</button>
			</div>
			<div>
				<h3>Count2 - {count2}</h3>
				<button onClick={() => dispatch2('increment')}>Increment</button>
				<button onClick={() => dispatch2('decrement')}>Decrement</button>
				<button onClick={() => dispatch2('reset')}>Reset</button>
			</div>
		</div>
	);
}

export default UseReducer3;
