import React, { useState } from 'react'

export default function Example() {

    const [state, setState] = useState(0);

    const handleUp = () => {
        setState((prev) => {
           return ++prev
        })
    }
    
    const handleDown = () => {
        setState(prev => --prev)
    }


    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleUp}>＋</button>
            <button onClick={handleDown}>ー</button>
        </>
    )
}
