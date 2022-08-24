import React, {useEffect, useState} from "react";
import BoardTile from "./BoardTile";
import Scoreboard from "./ScoreBoard";

function PracticeGameManager({signs}) {

    const [firstClick, setFirstClick] = useState(null);
    const [boardData, setBoardData] = useState([])
    const [highscores, setHighscores] = useState([])
    const [difficulty, setDifficulty] = useState(2);
    const [turns, setTurns] = useState(0);
    const [matchesMade, setMatchesMade] = useState(0);
    const [showScores, setShowScores] = useState(false);
    
    const diffColor = ["lightgreen", "yellow", "orange", "red"]

    useEffect(() => {
        fetch("http://localhost:8001/highscores")
        .then(res => res.json())
        .then(setHighscores)

        setBoardData(createBoard())
        
    }, [difficulty, setDifficulty])


    function handleUpdateDifficulty(e) {
        setDifficulty(e.target.value)
        setBoardData([])
        setTurns(0);
        setMatchesMade(0)
    }

    function handleAddClicked(tileData) {

        if(firstClick === null)
        {   
            modifySignData(tileData, "clicked", true)
            tileData.clicked = true;
            setFirstClick(tileData)
        }
        else 
        {

            if ((firstClick.sign.meaning === tileData.sign.meaning) && (firstClick.content !== tileData.content))
            {
                setTurns(() => turns + 1)
                setMatchesMade(() => matchesMade + 1)
                
                let newData = boardData.map(row => {
                    return row.map(tile => {
                        if (tile.id === tileData.id) 
                        {
                            tileData.visible = false
                            tileData.clicked = true
                            return tileData
                        }
                        else if (tile.id === firstClick.id)
                        {
                            return {
                                content: firstClick.content,
                                sign: firstClick.sign,
                                visible: false,
                                clicked: true,
                                id: firstClick.id
                            }
                        }
                        else {
                            return tile
                        }
                    })
                }) 
                
                setFirstClick(null)
                setBoardData(newData)
                if ((matchesMade + 1) >= (difficulty * difficulty / 2))
                {
                    handleGameOver();
                }
            }
            else
            {   
                modifySignData(firstClick, "clicked", false)
                setTurns(() => turns + 1)
                setFirstClick(null)
            }
        }
    }

    function handleGameOver() {

        handleNewHigh(turns + 1)
        setMatchesMade(0)
        setTurns(0)
        setBoardData(createBoard())
    }

    function modifySignData(tileData, attribute, value) {
        let temp = boardData.map(row => row.map(tile => {
            if (tile.id === tileData.id)
            {
                let tempTile = {
                    content: tileData.content,
                    sign: tileData.sign,
                    visible: tileData.visible,
                    clicked: tileData.clicked,
                    id: tileData.id
                }

                tempTile[attribute] = value;

                return tempTile
            }
            else
            {
                return tile;
            }

            })
        )
        
        setBoardData(temp)
    }

    function handleNewHigh(turns) {

        let hs = [...highscores]
        let placed = false;
        let score = difficulty * difficulty - turns
        if (score < 0) {score = 0}
        
        for (let i = 0; i < hs.length; i++)
        {
            if (hs[i].score <= score && !placed)
            {
                let scorer = prompt("What is your name?", "")
                hs.splice(i, 0, {
                    
                    id: i + 1,
                    score: score,
                    scorer: scorer
                      
                });

                hs.pop();

                placed = true

                const configObj = {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(hs[i])
                }

                fetch(`http://localhost:8001/highscores/${i + 1}`, configObj)
            }
            else if (placed)
            {
                hs[i].id++

                const configObj = {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(hs[i])
                }

                fetch(`http://localhost:8001/highscores/${i + 1}`, configObj)
            }

        }

        setHighscores(hs)

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
            signsList.push({content: "image", sign: signs[index], visible: true, id: `${i}image`, clicked: false})
            signsList.push({content: "meaning", sign: signs[index], visible: true, id: `${i}meaning`, clicked: false})
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
        let i = 0;
        let refinedBoard = boardData.map(row => {
            return <tr key={`${i++}Row`} >{row.map(tile => {
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
            <div className="std-style game-top">
                <h2>Practice your ASL Knowledge!</h2>
                <p>Match hidden pairs, do it in the least amount of moves to get a better score!</p>
            </div>

            <select className="std-style inp-style" onChange={handleUpdateDifficulty} style={{"backgroundColor": diffColor[(difficulty/2) - 1]}}>
                            <option style={{"backgroundColor": "lightgreen"}} value={2}>Easy Mode: 2 x 2</option>
                            <option style={{"backgroundColor": "yellow"}}value={4}>Medium Mode: 4 x 4</option>
                            <option style={{"backgroundColor": "orange"}}value={6}>Hard Mode: 6 x 6</option>
                            <option style={{"backgroundColor": "red", "color": "white"}}value={8}>Extreme Mode: 8 x 8</option>
            </select>
            <table className="std-style brd-style">
                <thead>
                    <tr>
                        <th className="std-style" colSpan={difficulty}>Practice Game</th>
                    </tr>
                    <tr>
                        <th colSpan={difficulty}>Turns Taken: {turns}</th>
                    </tr>
                    {showScores ? 
                        <tr>
                            <td colSpan={difficulty}>
                                <Scoreboard highscores={highscores} />
                                
                            </td>
                        </tr> : null
                    }
                </thead>

                <tbody>
                {renderBoard()}
                </tbody>
            </table>
            {showScores ? <button onClick={() => setShowScores(!showScores)} >Hide Scores</button> : 
            <button onClick={() => setShowScores(!showScores)}>Show Highscores</button>}
        </div>
    )
}

export default PracticeGameManager