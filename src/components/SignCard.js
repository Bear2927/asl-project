import React from "react";

function SignCard({word}) {
    return (
        <div>
            <img src={word.image} alt={word.meaning} />
        </div>
    )
}

export default SignCard