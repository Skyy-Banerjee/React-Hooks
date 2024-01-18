import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
// fetching data fom a API endpoint with useReducer()

const initialState = {
	loading: true,
	error: '',
	post: {},
};

//reducer()
function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				post: action.payload,
				error: '',
			};
		case 'FETCH_ERROR':
			return {
				loading: false,
				post: {},
				error: 'Something went wrong',
			};
		default:
			return state;
	}
}

function UseReducer5() {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/1`)
			.then((resp) => {
				dispatch({ type: 'FETCH_SUCCESS', payload: resp.data });
			})
			.catch((err) => {
				dispatch({ type: 'FETCH_ERROR' });
			});
	}, []);
	return (
		<div>
			{state.loading ? 'Loading..' : state.post.title}
			{state.error ? state.error : null}
		</div>
	);
}

export default UseReducer5;
