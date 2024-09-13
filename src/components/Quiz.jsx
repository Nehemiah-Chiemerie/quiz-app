import React from 'react';
import ReactDOM from 'react-dom';
import he from 'he';


export default function Quiz(props){
  return (
    <section className={props.darkMode ? "dark" : ""}>
      <div className='body-container'> 
        <h3 className="heading-quest">{he.decode(props.questions)}</h3>
        {props.answers.map((answer, index) => {
            const isSelected = props.selectedAnswer === answer
            const isCorrect = answer === props.correct_answer
            const isWrong = answer === props.incorrect_answers
            const isChecked = props.checkedAnswer
            let backgroundColor;


            if(isChecked){
                if(isCorrect){
                    backgroundColor = "#94D7A2"
                }else if(isSelected && !isCorrect){
                    backgroundColor = "#F8BCBC"
                }
            }
            
            return(
            <button
                style={{ backgroundColor }}
                className="box"
                key={index}
                onClick={() => props.checkAnswers(props.id, answer)}
                disabled={isChecked}
            >
            {he.decode(answer)}
           </button>
            )
        })}
        <hr className="hr" />
      </div> 
    </section >
  );
}
