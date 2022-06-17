import React from "react";

export default function Question(props) {
    
    return (
        <div>
            <p>{props.question}</p>
            <div>{[...props.incorrect_answers, props.correct_answer] }</div>
            <hr/>
            
        </div>
    )
}