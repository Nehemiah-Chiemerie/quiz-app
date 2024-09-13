import React from 'react';
import Quiz from "./components/Quiz";
import Play from "./components/Play";
import Navbar from "./components/Navbar";
import { nanoid } from "nanoid";

function App() {
  // State for the MAIN Quizzical
  const [quiz, setQuiz] = React.useState([]);
  
  // State to Start from Affresh
  const [start, setStart] = React.useState([]);
  
  // State for selected answers
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  
  // State for marking the quiz as checked
  const [checkedAnswers, setCheckedAnswers] = React.useState({});
  
  // State for correct answer count
  const [score, setScore] = React.useState(0);
  
  // State for DarkMode change
  const [darkMode, setDarkMode] = React.useState(false)

  const getQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then((data) => {
        const formattedQuiz = data.results.map((item) => {
          const answer = shuffleArray([...item.incorrect_answers, item.correct_answer]);
          return {
            id: nanoid(),
            question: item.question,
            answers: answer,
            correct_answer: item.correct_answer,
          };
        });
        setQuiz(formattedQuiz);
        setSelectedAnswers({}); // Reset selected answers when fetching new questions
        setCheckedAnswers({}); // Reset checked answers when fetching new questions
        setScore(0); // Reset score when fetching new questions
      });
  };

  React.useEffect(() => {
    getQuestion();
  }, []);

  const startQuiz = () => {
    const newQuiz = {
      id: nanoid()
    };
    setStart(prevStart => [newQuiz, ...prevStart]);
  };

  const playAgain = () => {
    getQuestion();
  };

  const checkAnswers = (quizId, answer) => {
    const correctAnswer = quiz.find(q => q.id === quizId).correct_answer;
    setSelectedAnswers(prev => ({
      ...prev,
      [quizId]: answer
    }));
    setCheckedAnswers(prev => ({
      ...prev,
      [quizId]: true
    }));
    if (answer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };
  const toggleDarkMode = () =>{
    setDarkMode(prevBackground => !prevBackground)
  }

  return (
    <main>
      {start.length > 0 ? (
        <div>
        <Navbar 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
         />
          {quiz.map((item) => (
            <Quiz 
              key={item.id}
              id={item.id}
              questions={item.question}
              answers={item.answers}
              checkAnswers={checkAnswers}
              correct_answer={item.correct_answer}
              selectedAnswer={selectedAnswers[item.id]}
              checkedAnswer={checkedAnswers[item.id]}
              darkMode={darkMode}
            />
          ))}
          <Play 
            playAgain={playAgain} 
            score={score} 
            totalQuestions={quiz.length}
            darkMode={darkMode}
          />
        </div>
      ) : (
        <div className="no-quiz">
          <h1>Quizzical</h1>
          <p className="no-p">Some description if needed</p>
          <button className="first-note" onClick={startQuiz}>
            Start quiz
          </button>
        </div>
      )}
    </main>
  );
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default App;
