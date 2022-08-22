import React, {useEffect, useState} from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import NavBar from "./NavBar";
import SignForm from "./SignForm";
import InputBar from "./InputBar";
import SignCardContainer from "./SignCardContainer";
import "../App.css";
import Welcome from "./Welcome";
import Footer from "./Footer";
import PracticeGameManager from "./PracticeGameManager";


function App() {

    const [signWords, setSignWords] = useState([]);
    const [formMeaning, setFormMeaning] = useState("");
    const [formImage, setFormImage] = useState("");
    const [formRemove, setFormRemove] = useState("")
    const [userInput, setUserInput] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:8001/words")
        .then(res => res.json())
        .then(setSignWords)
    }, [])

    function handleInputChange(e) {
        setUserInput(e.target.value)
    }

    function handleUpdateRemove(e) {
        setFormRemove(e.target.value)
    }

    function handleUpdateMeaning(e) {
        setFormMeaning(e.target.value)
    }

    function handleUpdateImage(e) {
        setFormImage(e.target.value)
    }

    function handleAddWord() {

        //If the fields have content and word is not in db.
        if (formImage !== "" && formMeaning !== "" && !checkSign(formMeaning))
        {
            const newSign = {
                meaning: formMeaning,
                image: formImage
            }
            
            const configObj = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newSign)
            }
            
            fetch("http://localhost:8001/words", configObj)
            .then(res => res.json())
            .then(word => setSignWords([...signWords, word]))
            
            setFormImage("")
            setFormMeaning("")
        }
        else
        {
            alert("Missing meaning/url or sign is already in system!")
        }
    }

    function handleRemoveSign() {

        //If field is not empty and word if in db.
        if (formRemove !== "" && checkSign(formRemove))
        {

            const sign = signWords.find(word => word.meaning === formRemove)
            const configObj = {
                method: "DELETE"
            }
            
            fetch(`http://localhost:8001/words/${sign.id}`, configObj)
            
            setSignWords(signWords.filter(filteredSign => filteredSign.meaning !== formRemove))
            
            setFormRemove("")
        }
        else
        {
            alert("Error!")
        }

    }

    //If any are returned from filter, the sign is in system.
    function checkSign(meaning) {
        return signWords.filter(sign => sign.meaning === meaning).length > 0
    }

    //Creates array of objects.
    function createStatement() {

        //If field isn't empty.
        if (userInput !== "")
        {

            //Split into each word.
            const array = userInput.split(" ")
            let result = [];
            
            //For each word in userInput
            array.forEach(word => {
                
                //Find word with same meaning
                let wordObj = signWords.find(foundWord => foundWord.meaning === word.toLowerCase())
                
                //If the word didn't exist, try each letter.
                if (!wordObj)
                {
                    let deepWord = word.split("")
                    deepWord.forEach(deepLetter => {
                        let temp = signWords.find(foundLetter => foundLetter.meaning === deepLetter.toLowerCase())

                        //If anything is found, return result. Keeps strange characters out.
                        if (temp)
                        {
                            result = [...result, temp]
                        }
                    })
                }
                else
                {
                    result = [...result, wordObj];
                }
                
            })
            
            return result
        }
        else
        {
            //If is empty, return none.
            return []
        }

    }

    return(
        <div className="App">
        <NavBar/>
        <Routes>
            <Route path="/form" element={<SignForm formMeaning={formMeaning} formImage={formImage}
            onChangeMeaning={handleUpdateMeaning} onChangeImage={handleUpdateImage} onSubmitForm={handleAddWord}
            onSubmitRemove={handleRemoveSign} formRemove={formRemove} onChangeRemove={handleUpdateRemove}/>} />

            <Route path="/input" element={[
                <InputBar input={userInput} setInput={handleInputChange}/>, 
                <SignCardContainer statement={createStatement()}/>]} 
            />

            <Route path="/practice" element={(signWords.length > 0) ? <PracticeGameManager signs={signWords} /> : null} />

            <Route exact path="/" element={<Welcome />} />

            <Route path="*" element={<h3>Error 404: Page Not Found</h3>} />
        </Routes>
        <Footer/>

        </div>
    );
}

export default App;