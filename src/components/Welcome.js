import React, {useEffect, useState} from "react";


function Welcome() {

    const [welcomeTxt, setWelcomeTxt] = useState("")

    //Pull big text from welcome.txt.
    useEffect(() => {
        
            fetch('welcome.txt')
            .then(res => res.text())
            .then(txt => setWelcomeTxt(`${txt}`))

    }, [])

    return (
        <div className="welcome">
            <h1>Welcome to Sign Me Up</h1>
            <p>{welcomeTxt}</p>
         
        </div>
    )
}

export default Welcome