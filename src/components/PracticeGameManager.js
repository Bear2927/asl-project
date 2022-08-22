import React, {useEffect, useState} from "react";
import BoardTile from "./BoardTile";

function PracticeGameManager({signs}) {

    const [firstClick, setFirstClick] = useState(null);
    const [boardData, setBoardData] = useState([])
    const [highscores, setHighscores] = useState([])
    const [difficulty, setDifficulty] = useState(2);
    const [turns, setTurns] = useState(0);
    const [matchesMade, setMatchesMade] = useState(0);
    

    useEffect(() => {
        fetch("http://localhost:8001/highscores")
        .then(res => res.json())
        .then(setHighscores)

        setBoardData(createBoard())
        
    }, [difficulty, setDifficulty])


    function handleUpdateDifficulty(e) {
        setDifficulty(e.target.value)
        setBoardData([])
    }

    function handleAddClicked(tileData) {

        if(firstClick === null)
        { 
            setFirstClick(tileData)
        }
        else 
        {

            if (firstClick.sign.meaning === tileData.sign.meaning)
            {
                console.log("Matched!")
                setTurns(() => turns + 1)
                setMatchesMade(() => matchesMade + 1)
                setFirstClick(null)
                
                let newData = boardData.map(row => {
                    return row.map(tile => {
                        if (tile.id === tileData.id) 
                        {
                            tileData.visible = false
                            return tileData
                        }
                        else if (tile.id === firstClick.id)
                        {
                            return {
                                content: firstClick.content,
                                sign: firstClick.sign,
                                visible: false,
                                id: firstClick.id
                            }
                        }
                        return tile
                    })
                }) 
                
                setBoardData(newData)
                if ((matchesMade + 1) >= (difficulty * difficulty / 2))
                {
                    handleGameOver();
                }
            }
            else
            {
                setTurns(() => turns + 1)
                setFirstClick(null)
            }
        }
    }

    function handleGameOver() {

        handleNewHigh(turns)
        setMatchesMade(0)
        setTurns(0)
        setBoardData(createBoard())
    }

    function handleNewHigh(turns) {

        let hs = [...highscores]

        for (let i = 0; i < hs.length; i++)
        {
            if (hs[i].score <= turns)
            {

            }
        }
    }

    function createBoard() {

        let board = [];

        for (let i = 0; i < difficulty; i++)
        {
            board.push([])
        }
        //Signs needed: Area / 2
        const signsCount = difficulty * difficulty / 2;

        let signsList = []

        for (let i = 0; i < signsCount; i++) {
            let index = Math.floor(Math.random() * signs.length)
            signsList.push({content: "image", sign: signs[index], visible: true, id: `${i}image`})
            signsList.push({content: "meaning", sign: signs[index], visible: true, id: `${i}meaning`})
        }

        signsList = shuffleBoard(signsList);

        let signIndex = 0;

        for (let x = 0; x < difficulty; x++){
            for (let y = 0; y < difficulty; y++) {

                board[x][y] = signsList[signIndex++];
            }
        }
        return board
    }

    function renderBoard() {

        let refinedBoard = boardData.map(row => {
            return <tr key={Math.floor(Math.random() * 100)} >{row.map(tile => {
            return <BoardTile key={tile.id} tileData={tile} onClickTile={handleAddClicked}/>})}</tr>
        });

        return refinedBoard
    }

    function shuffleBoard(list) {
        let currentIndex = list.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [list[currentIndex], list[randomIndex]] = [
            list[randomIndex], list[currentIndex]];
        }
      
        return list;
      }

    return (
        <div className="practice-game">
            <h2>Practice your ASL Knowledge!</h2>
            <p>Match hidden pairs, do it in the least amount of moves to get a better score!</p>
            <table>
                <thead>
                    <tr>
                        <th colSpan={difficulty}>Practice Game</th>
                    </tr>
                    <tr >
                        <td colSpan={difficulty} className="practice-select">
                            <select onChange={handleUpdateDifficulty}>
                                <option value={2}>Easy Mode: 2 x 2</option>
                                <option value={4}>Medium Mode: 4 x 4</option>
                                <option value={6}>Hard Mode: 6 x 6</option>
                                <option value={8}>Extreme Mode: 8 x 8</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={difficulty}>Turns Taken: {turns}</th>
                    </tr>
                </thead>

                <tbody>
                {renderBoard()}
                </tbody>
            </table>
        </div>
    )
}

export default PracticeGameManager