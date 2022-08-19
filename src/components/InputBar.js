import React from "react";

function InputBar({input, setInput}) {

    return (
        <div>
            <h3>Find a phrase: </h3>
            <input onChange={setInput} type="text" placeholder="enter phrase..." value={input}/>
        </div>
    )
}

export default InputBar