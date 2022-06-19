import React from "react";

export default function Question(props) {

    const[correct, setCorrect] = React.useState(false)
    const[randomChoices, setRandomChoices] = React.useState([])
    
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr
    }

    
    function checkAnswer(value) {
        return props.correct_answer === value ? setCorrect(true) : setCorrect(false)
    
    }
     
    
    // load and store randomized answers in state
    React.useEffect(()=> {
        const choices = shuffleArray([...props.incorrect_answers, props.correct_answer])

        setRandomChoices(() => {
            const randomized = choices.map( (choice,index) => <button onClick={() => checkAnswer(choice)} key={index}>{choice}</button> )
            return randomized
        })
    }, [])
    
    //console.log(props.correct_answer)

    return (
        <div>
            <p>{props.question}</p>
            {randomChoices}
            {correct && <h3>Correct Answer</h3>} 
            <hr/>
            
        </div>
    )
}