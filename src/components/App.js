import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import NavBar from "./NavBar";
import SignForm from "./SignForm";
import InputBar from "./InputBar";
import SignCardContainer from "./SignCardContainer";


function App() {

    const [signWords, setSignWords] = useState([]);
    const [signLetters, setSignLetters] = useState([])
    const [formMeaning, setFormMeaning] = useState("");
    const [formImage, setFormImage] = useState("");
    const [userInput, setUserInput] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:8001/words")
        .then(res => res.json())
        .then(setSignWords)

        fetch("http://localhost:8001/letters")
        .then(res => res.json())
        .then(setSignLetters)
    }, [])

    function handleInputChange(e) {
        setUserInput(e.target.value)
    }

    function createStatement() {
        const array = userInput.split(" ")
        console.log(array[0][0])
        let result = [];

        array.forEach(word => {
            let wordObj = signWords.find(foundWord => foundWord.meaning === word)

            if (wordObj === null)
            {
                // word.forEach(letter => {
                //     console.log(letter)
                //     wordObj = [...wordObj, signLetters.find(foundLetter => foundLetter.meaning === letter)]
                // })

                for (let i = 0; i < word.length; i++)
                {
                    let temp = signLetters.find(foundLetter => foundLetter.meaning === word[i])
                    wordObj = [...wordObj, temp]
                }
            }

            result = [...result, wordObj];
        })

        return result

    }

    return(
        <div>
        <SignForm />
        <InputBar input={userInput} setInput={handleInputChange}/>
        {(userInput !== "") ?<SignCardContainer statement={createStatement()}/> : null}
        

        </div>
    );
}

export default App;