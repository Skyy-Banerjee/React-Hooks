import React from 'react';
import { useState } from 'react';

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount((count) => count + 1)}>
				Count {count}
			</button>
		</div>
	);
}

export default Counter;
