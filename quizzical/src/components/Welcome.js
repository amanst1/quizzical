import React from "react"

export default function Welcome (props) {
    //console.log(props)
   

    return (
        <div>

            <h1>QUIZZICAL</h1>
            <p>The game to test your know hows</p>

            <button onClick={()=>props.start()} > Start quiz</button>
        </div>
    )

}