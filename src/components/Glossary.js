import React from "react";


function Glossary({signs, searchInput}) {

    return(
        <div className="glossary">
            <div className="filter">
                <h1 className="glossaryheader">Glossary</h1>
                <input type="text" placeholder="Search Input..." onChange={searchInput}></input>
            </div>

            <table border="3" className="glossarytable">
                <thead>
                    <tr>
                        <th>Meaning</th>
                        <th>Sign</th>
                    </tr>
                </thead>
                <tbody>
                        {signs.map(sign => <tr key={sign.id}><td className="glossarymeaning">{sign.meaning}</td><td><img src={sign.image} alt={sign.meaning}/></td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Glossary;