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
