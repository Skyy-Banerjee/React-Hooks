import React, { useEffect, useState } from 'react';

function UseEffect1() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');
	useEffect(() => {
		//Changing the title with the count
		console.log(`Updating document title ${count}!`);
		document.title = `You clicked ${count} times!`;
	},[count]);
	return (
		<div>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				onClick={() => {
					setCount((count) => count + 1);
				}}
			>
				Clicked {count} times!
			</button>
		</div>
	);
}

export default UseEffect1;
