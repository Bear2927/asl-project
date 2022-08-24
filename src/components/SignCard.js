import React from "react";
import {Card, Image} from 'semantic-ui-react';

function SignCard({word}) {

    return (
        <Card className="card std-style">
            <Image src={word.image} alt={word.meaning} className="card-images"/>
            <Card.Content>
                <Card.Description>
                    <p>Meaning:</p>
                    <p>{word.meaning}</p>
                    </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default SignCard