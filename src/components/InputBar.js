import React from "react";

function InputBar({input, setInput}) {

    return (
        <div className="inputbar std-style">
            <h2>Translate a phrase: </h2>
            <input className="std-style inp-style" onChange={setInput} type="text" placeholder="enter phrase..." value={input}/>
        </div>
    )
}

export default InputBar