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
