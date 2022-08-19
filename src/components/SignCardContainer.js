import React from "react";
import SignCard from "./SignCard"

function SignCardContainer({statement}) {

    const picList = statement.map(word => {
        console.log(word)
        return <SignCard word={word} />
    })

    return (
        <div>
            {picList}
        </div>
    )
}

export default SignCardContainer