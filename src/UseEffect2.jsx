import React, { useEffect, useState } from 'react';

function UseEffect2() {
	const [x, setX] = useState();
	const [y, setY] = useState();
	function logMousePosition(evt) {
		console.log('Mouse Event');
		setX(evt.clientX);
		setY(evt.clientY);
	}
	useEffect(() => {
		console.log('useEffect called!');
		window.addEventListener('mousemove', logMousePosition);

		return () => {
			console.log('Component unmounting code!');
			window.removeEventListener('mousemove', logMousePosition);
		};
	}, []);
	return (
		<div>
			Hooks X - {x} Y - {y}
		</div>
	);
}

export default UseEffect2;
