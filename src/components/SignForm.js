import React from "react";

function SignForm({formMeaning, formImage, onChangeMeaning, onChangeImage, onSubmitForm, onSubmitRemove, formRemove, onChangeRemove}) {

    function handleSubmit(e) {
        e.preventDefault()
        onSubmitForm()
    }

    function handleRemove(e) {
        e.preventDefault()
        onSubmitRemove()
    }
    return (
        <div className="forms std-style">

            <h2>Help us grow!</h2>

            <p>Have a sign we don't? Add it below by giving us the meaning and a url to an image or gif!</p>
            <form onSubmit={handleSubmit}>
                <input className="std-style inp-style" onChange={onChangeMeaning} type="text" value={formMeaning} placeholder="sign meaning..."/>
                <input className="std-style inp-style" onChange={onChangeImage} type="text" value={formImage} placeholder="sign image url..."/>
                <button className="btn-style" type="submit">SUBMIT SIGN</button>
            </form>
            
            <p>See an incorrect sign? Remove it below and post a fixed one!</p>
            
            <form onSubmit={handleRemove}>
                <input className="std-style inp-style" onChange={onChangeRemove} type="text" placeholder="sign to remove..." value={formRemove}/>
                <button className="btn-style" type="submit">REMOVE SIGN</button>
            </form>
        </div>
    )
}

export default SignForm