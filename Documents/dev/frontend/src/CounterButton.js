import React, { useState } from 'react';

function CounterButton() {

    const [state, setState] = useState(0);

    const increment = () => {
        let newNumber = state + 1;
        setState(newNumber)
    }

    return (
        <button onClick={increment}>{state}</button>
    )
}

export default CounterButton;