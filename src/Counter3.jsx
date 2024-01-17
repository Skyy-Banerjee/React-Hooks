import React, { useState } from 'react';
//updating [] with useState()

function Counter3() {
	const [items, setItems] = useState([]);

	function addItem() {
		setItems([
			...items,
			{
				id: items.length,
				value: Math.floor(Math.random() * 10) + 1,
			},
		]);
	}
	return (
		<div>
			<button onClick={addItem}>Add a number</button>
			<ul>
				{items.map((item) => {
					return <li key={item.id}>{item.value}</li>;
				})}
			</ul>
		</div>
	);
}

export default Counter3;
