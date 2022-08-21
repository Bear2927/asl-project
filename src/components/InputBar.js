import React from "react";

function InputBar({input, setInput}) {

    return (
        <div id="inputbar">
            <h3>Translate a phrase: </h3>
            <input onChange={setInput} type="text" placeholder="enter phrase..." value={input}/>
        </div>
    )
}

export default InputBar