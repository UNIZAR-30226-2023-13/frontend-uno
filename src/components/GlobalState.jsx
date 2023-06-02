import { useState, useEffect } from "react";

// This is the object that keeps the state
let state = null;
let initiated = false;

// The array of state setter-methods
const setters = [];

// The method that updates ALL the setters
function setState(obj) {
    const newState = { ...state, ...obj };
    state = newState;
    setters.forEach((setter) => setter(newState));
}

export function useGlobalState(initialState) {
    if (!initiated && initialState) {
        state = initialState;
    }
    initiated = true;

    // Create a new state
    const [s, ss] = useState(state);

    // Add the setter of the new state to array of setters
    if (!setters.includes(ss)) setters.push(ss);

    useEffect(
        () =>
        // When hook is destroyed, remove unused setter from array of setters
            () => {
                setters.splice(setters.indexOf(ss), 1);
            },
        [],
    );

    // Return global state object, and the global state setter method
    return [state, setState];
}
