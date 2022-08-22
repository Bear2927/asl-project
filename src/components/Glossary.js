import React from "react";
import SignCard from "./SignCard";

function Glossary({signs}) {

    return(
        <table border="3">
            <thead>
                <tr>
                    <th>Meaning</th>
                    <th>Sign</th>
                </tr>
            </thead>
            <tbody>
                    {signs.map(sign => <tr key={sign.id}><td>{sign.meaning}</td><td><img src={sign.image}/></td></tr>)}
            </tbody>
        </table>
    )
}

export default Glossary;