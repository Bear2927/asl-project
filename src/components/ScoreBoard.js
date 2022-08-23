import React from "react";

function Scoreboard({highscores}) {

    const scoreList = highscores.map(score => {
        return <p key={score.id} >Score: {score.score} by {score.scorer}</p>
    })

    return (
        <div className="scoreboard" >
            {scoreList}
        </div>
    )
}

export default Scoreboard