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


    function checkAnswer(value, choosenBtn) {
        //console.log(randomChoices[choosenBtn])
        if(props.correct_answer === value) {
            correct ? props.recordChoices(props.qnum, correct) :
                    props.recordChoices(props.qnum, !correct)
            // props.displayResult ? randomChoices[choosenBtn].props.className="btn--choice-correct" : 
            // randomChoices[choosenBtn].props.className="btn--choice"          
            setCorrect(true)
            
        } else {
            !correct ? props.recordChoices(props.qnum, correct) : 
                        props.recordChoices(props.qnum, !correct)
           // props.displayResult ? randomChoices[choosenBtn].className="btn--choice-incorrect" : ""
            setCorrect(false)    
        }
         
              
        
    }
    
    // load and store randomized answers in state
    React.useEffect(()=> {
        const choices = shuffleArray([...props.incorrect_answers, props.correct_answer])

        setRandomChoices(() => {
            const randomized = choices.map( (choice,index) => 
                <button className="btn--choice" onClick={() => checkAnswer(choice, index)} key={index}>{choice}</button> )
            return randomized
        })
    }, [props.correct_answer])
    
    
    return (
        <div className="question--container">
            <p className="question">{props.question}</p>
            {randomChoices}

            <hr/>
            
        </div>
    )
}