import React, { useEffect, useState } from 'react';
import axios from 'axios';
//Fetching data from an API endpoint using useState()

function UseReducer4() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [post, setPost] = useState({});
	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/1`)
			.then((resp) => {
				setLoading(false);
				setPost(resp.data);
				setError('');
			})
			.catch((err) => {
				setLoading(false);
				setPost({});
				setError('Something went wrong!');
			});
	}, []);
	return (
		<div>
			{loading ? 'Loading..' : post.title}
			{error ? error : null}
		</div>
	);
}

export default UseReducer4;
