import React from 'react';

export default function Play(props) {
    return (
        <div className={props.darkMode ? "dark" : ""}>
            <div className="play">
                <p>You scored {props.score}/{props.totalQuestions} correct Answers</p>
                <button
                    onClick={props.playAgain}
                    className="play--button"
                >
                    Restart
                </button>
            </div>
        </div>
    );
}













// import React from 'react';

// export default function Play(props) {
//     return (
//         <div className="play">
//             <p>You scored 0props.scoreAnswers</p>
//             <button 
//                 onClick={props.playAgain}
//                 className="play--button"
//             >
//                 Restart
//             </button>
//         </div>
//     );
// }
