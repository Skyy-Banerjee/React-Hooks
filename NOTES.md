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

function Counter1() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount((count) => count + 1)}>
				Count {count}
			</button>
		</div>
	);
}
export default Counter1;
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

# useContext() =>

React Context is a way to manage state globally.

It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.

The Problem:
State should be held by the highest parent component in the stack that requires access to the state.

The Solution:
The solution is to create context.

- Create Context
  To create context, we must Import createContext and initialize it.

Next we'll use the Context Provider to wrap the tree of components that need the state Context.

- Context Provider
  Wrap child components in the Context Provider and supply the state value.

Now, all components in this tree will have access to the user Context.

- Use the useContext Hook
  In order to use the Context in a child component, we need to access it using the useContext Hook.

```jsx
//Full example
import { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';

const UserContext = createContext();

function Component1() {
	const [user, setUser] = useState('Jesse Hall');

	return (
		<UserContext.Provider value={user}>
			<h1>{`Hello ${user}!`}</h1>
			<Component2 />
		</UserContext.Provider>
	);
}

function Component2() {
	return (
		<>
			<h1>Component 2</h1>
			<Component3 />
		</>
	);
}

function Component3() {
	return (
		<>
			<h1>Component 3</h1>
			<Component4 />
		</>
	);
}

function Component4() {
	return (
		<>
			<h1>Component 4</h1>
			<Component5 />
		</>
	);
}

function Component5() {
	const user = useContext(UserContext);

	return (
		<>
			<h1>Component 5</h1>
			<h2>{`Hello ${user} again!`}</h2>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

So, CONTEXT provides a way to pass data through the component tree without having to pass props down manually at every level.

# useReducer() =>
- Hooks so far..

1. useState() - state
2. useEffect() - effect
3. useContext() - context API

4. And.. Now, useReducer() - reducers

- First the JS [ ] reducer method

The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).

```js
//Arrays.prototype.reduce()
const array1 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);
console.log(sumWithInitial);
// Expected output: 10
```
- Now, useReducer()
The useReducer Hook is similar to the useState Hook.
It allows for custom state logic.
If we find ourselves keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful.

The reducer function contains your custom state logic and the initialStatecan be a simple value but generally will contain an object.

The useReducer Hook returns the current state and a dispatch method.

1. Simple useReducer()
```jsx
import React, { useReducer } from 'react';
//Simple counter with useReducer()

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

function UseReducer1() {
	const [count, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			<h3>{count}</h3>
			<button onClick={() => dispatch('increment')}>Increment</button>
			<button onClick={() => dispatch('decrement')}>Decrement</button>
			<button onClick={() => dispatch('reset')}>Reset</button>
		</div>
	);
}
export default UseReducer1;
```

2. useReducer() with {} as state
```jsx
import React, { useReducer } from 'react';
//State as an {}

const initialState = {
	firstCounter: 0,
	secondCounter: 10,
};

//reducer()
const reducer = (state, action) => {
	switch (action.type) {
		case 'increment':
			return { ...state, firstCounter: state.firstCounter + action.value };
		case 'decrement':
			return { ...state, firstCounter: state.firstCounter - action.value };
		case 'reset':
			return initialState;
		case 'increment2':
			return { ...state, secondCounter: state.secondCounter + action.value };
		case 'decrement2':
			return { ...state, secondCounter: state.secondCounter - action.value };

		default:
			return state;
	}
};

function UseReducer2() {
	const [count, dispatch] = useReducer(reducer, initialState);
	return (
		<div>
			<h3>First Counter - {count.firstCounter}</h3>
			<h3>Second Counter - {count.secondCounter}</h3>
			<button onClick={() => dispatch({ type: 'increment', value: 1 })}>
				Increment
			</button>
			<button onClick={() => dispatch({ type: 'decrement', value: 1 })}>
				Decrement
			</button>
			<button onClick={() => dispatch({ type: 'increment', value: 5 })}>
				Increment 5
			</button>
			<button onClick={() => dispatch({ type: 'decrement', value: 5 })}>
				Decrement 5
			</button>
			<div>
				<button onClick={() => dispatch({ type: 'increment2', value: 1 })}>
					Increment Counter 2
				</button>
				<button onClick={() => dispatch({ type: 'decrement2', value: 1 })}>
					Decrement Counter 2
				</button>
			</div>
			<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
		</div>
	);
}
export default UseReducer2;
```

3. Multiple useReducer() hooks, with the same reducer fx()
```jsx
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
```

# useReducer() with useContext()
- useReducer() -> Local state management
- Share state between components -> Global state management
- useReducer() + useContext()

# Fetching data with useReducer()

1. First with useState()..
```jsx
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
```

2. Now with useReducer()..
```jsx
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
```
![whenUseReducerVsUseState](https://github.com/Skyy-Banerjee/React-Hooks/assets/51888502/0adbac52-79ef-4ae0-ab1c-d73430b8a5d5)



