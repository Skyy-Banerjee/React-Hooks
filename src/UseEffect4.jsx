import React, { useEffect, useState } from 'react';

//useEffect with incorrect dependencies
//IntervalHookCounter()
//We can use multiple useEffect() in 1 component

function UseEffect4() {
	const [count, setCount] = useState(0);
	const tick = () => {
		setCount(count + 1);
	};
	useEffect(() => {
		const interval = setInterval(tick, 1000);
      return ()=>{
        clearInterval(interval);
      }  
	});
	return <div>{count}</div>;
}

export default UseEffect4;
