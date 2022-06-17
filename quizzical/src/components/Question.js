import React from "react";

export default function Question(props) {
    
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr
    }
     
    const choices = shuffleArray([...props.incorrect_answers, props.correct_answer])

    const randomChoices = choices.map( (choice,index) => <button key={index}>{choice}</button> )

    console.log(props.correct_answer)
    return (
        <div>
            <p>{props.question}</p>
            <div>{randomChoices}</div>
            <hr/>
            
        </div>
    )
}