# What are Hooks?

- New feature addition in React v16.8+ which allows us to use React features without writing a class

- Ex: State of a Component
- Hooks don't work inside CLASSES

- Only call Hooks at the top-level

# useState() =>

The React useState Hook allows us to track state in a function component.
State generally refers to data or properties that need to be tracking in an application.

The useState Hook can be used to keep track of strings, numbers, booleans, arrays, objects, and any combination of these!

We could create multiple state Hooks to track individual values.
Or, we can just use one state and include an object instead!

- Updating Objects and Arrays in State
  When state is updated, the entire state gets overwritten.

We can use the JavaScript spread(...) operator to help us.

1. Simple useState()-

```jsx
//Simple useState()
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
```

2. useState() with {}

```jsx
import React, { useState } from 'react';
//updating {} with useState()

function Counter2() {
	const [name, setName] = useState({ firstName: '', lastName: '' });
	return (
		<div>
			<form action="">
				<input
					type="text"
					value={name.firstName}
					onChange={(evt) => setName({ ...name, firstName: evt.target.value })}
				/>
				<input
					type="text"
					value={name.lastName}
					onChange={(evt) => setName({ ...name, lastName: evt.target.value })}
				/>
				<h2>Your first name is - {name.firstName}</h2>
				<h2>Your last name is - {name.lastName}</h2>
				<h3>{JSON.stringify(name)}</h3>
			</form>
		</div>
	);
}
export default Counter2;
```

3. useState() with []

```jsx
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
```

# useEffect() =>

The useEffect Hook allows you to perform side effects in your components.
Some examples of side effects are: fetching data, directly updating the DOM, and timers.
useEffect accepts two arguments. The second argument is optional.
useEffect(<function>, <dependency>)

useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.

This is not what we want. There are several ways to control when side effects run.

We should always include the second parameter which accepts an array. We can optionally pass dependencies to useEffect in this array.

Some effects require cleanup to reduce memory leaks.
Timeouts, subscriptions, event listeners, and other effects that are no longer needed should be disposed.

We do this by including a return function at the end of the useEffect Hook.

1. useEffect() basic

```jsx
import React, { useEffect, useState } from 'react';

function UseEffect1() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');
	useEffect(() => {
		//Changing the title with the count
		console.log(`Updating document title ${count}!`);
		document.title = `You clicked ${count} times!`;
	}, [count]); //dependancy prop/state
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
```

2. useEffect(), running only once []

```jsx
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
	}, []);
	return (
		<div>
			Hooks X - {x} Y - {y}
		</div>
	);
}
export default UseEffect2;
```

3. useEffect() with cleanup function()

```jsx
// Toggle MouseHook Component
import React, { useState } from 'react'
import UseEffect2 from './UseEffect2';
//cleanup fx()

function UseEffect3() {
    const [display, setDisplay] = useState(true);

  return (
    <div>
      <button onClick={()=> setDisplay(!display)}>Toggle Display</button>
      {display && <UseEffect2/>}
    </div>
  )
}

export default UseEffect3

// MouseHook Component
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
```

4. useEffect() with incorrect dependencies

```jsx
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
		return () => {
			clearInterval(interval);
		};
	});
	return <div>{count}</div>;
}
export default UseEffect4;
```

5. fetching data with useEffect()

```jsx
//Getting all posts (basic)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UseEffect5() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/posts`)
			.then((resp) => {
				console.log(resp);
				setPosts(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<h2>Post Data:</h2>
			<ul>
				{posts.map((post) => {
					return <li key={post.id}>{post.title}</li>;
				})}
			</ul>
		</div>
	);
}
export default UseEffect5;
```

6. Individual post with useEffect()

```jsx
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
```
