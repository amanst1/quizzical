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
        //console.log(props.correct_answer === value)
        if(props.correct_answer === value) {
            correct ? props.recordChoices(props.qnum, correct) : 
                        props.recordChoices(props.qnum, !correct)
            setCorrect(true)
            
        } else {
            !correct ? props.recordChoices(props.qnum, correct) : 
                        props.recordChoices(props.qnum, !correct)
            setCorrect(false)
            
        }
                
        
    }
    
    // load and store randomized answers in state
    React.useEffect(()=> {
        const choices = shuffleArray([...props.incorrect_answers, props.correct_answer])

        setRandomChoices(() => {
            const randomized = choices.map( (choice,index) => <button onClick={() => checkAnswer(choice)} key={index}>{choice}</button> )
            return randomized
        })
    }, [])
    
    
    return (
        <div>
            <p>{props.question}</p>
            {randomChoices}
            {correct && <h3>Correct Answer</h3>} 
            <hr/>
            
        </div>
    )
}