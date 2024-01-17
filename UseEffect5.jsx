import React, { useEffect, useState } from 'react';
import axios from 'axios';
//fetching individual post
function UseEffect5() {
	const [post, setPost] = useState({});
	const [id, setId] = useState(1);
	const [idFromBtnClick, setIdFromBtnClick] = useState(1);

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((resp) => {
				console.log(resp);
				setPost(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [idFromBtnClick]);

	function handleClick() {
		setIdFromBtnClick(id);
	}

	return (
		<div>
			<input
				type="text"
				value={id}
				onChange={(e) => {
					setId(e.target.value);
				}}
			/>
			<button type="button" onClick={handleClick}>
				Fetch Post
			</button>
			<h2>Single Post Data:</h2>
			<div>{post.title}</div>
		</div>
	);
}

export default UseEffect5;
