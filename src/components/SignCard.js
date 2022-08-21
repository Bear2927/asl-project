import React from "react";
import {Card, Image} from 'semantic-ui-react';

function SignCard({word}) {

    console.log(word)
    return (
        <Card className="card">
            <Image src={word.image} alt={word.meaning} className="card-images"/>
            <Card.Content>
                <Card.Description>
                    <p>{word.meaning}</p>
                    </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default SignCard