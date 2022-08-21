import React from "react";
import { Card, Grid, GridColumn } from "semantic-ui-react";
import SignCard from "./SignCard"
import { Tab } from "semantic-ui-react";

function SignCardContainer({statement}) {

    const picList = statement.map(word => {
        console.log(word)
        return <SignCard key={word.id} word={word}/>
    })

    return (
        <div>
            <Card.Group itemsPerRow={6} className="sign-container"> 
                    {picList}
            </Card.Group>
            <Tab />
        </div>
    )
}

export default SignCardContainer