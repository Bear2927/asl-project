import React, {useState} from "react";

function BoardTile({tileData, onClickTile}) {


    function handleClick() {
        onClickTile(tileData)
    }

    function renderTile() {

        if (tileData.content === "image")
        {
            return <img src={tileData.sign.image} alt="" />
        }
        else
        {
            return <p>{tileData.sign.meaning}</p>
        }
    }

    return (
        <td onClick={handleClick} className={`board-tile std-style ${tileData.clicked ? "clicked" : ''}`}>
            {tileData.visible ? renderTile() : null}
        </td>
    )
}

export default BoardTile