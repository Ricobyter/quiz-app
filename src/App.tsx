import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUES = 15;


function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuizQuestions(TOTAL_QUES, Difficulty.EASY))
  console.log(questions)


  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUES,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false);
    setFinalScore(0)

  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      //Check if the answer is correct
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1)
        setFinalScore(prev => prev + 1)
      }

      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        //answer:answer,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers(prev => [...prev, answerObject])

    }

  }

  const nextQuestion = () => {
    //Move to the next question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUES) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="text-white flex justify-center items-center flex-col  h-[100vh] w-[100vw]" >
      {/* style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}  */}
        <h1 className='text-5xl mb-14 text-center font-sedan text-purple-700 underline'>Quiz Mantra</h1>
      <div className='w-[50vw] text-purple-700 h-[50vh]'>

      {gameOver || userAnswers.length === TOTAL_QUES ? (
        <div className='flex justify-center items-center'>

        <button className='px-3 py-2 rounded-xl bg-purple-600 font-montserrat text-white text-xl hover:bg-purple-800 hover:scale-105 duration-100 ease-in-out' onClick={startQuiz}>Start New Quiz</button>
        </div>
      ) : null}
      {(!gameOver && !(userAnswers.length === TOTAL_QUES)) ? <p className='text-2xl mb-6 text-right'><span className='text-purple-700 font-bold'>Score: </span>{score}</p> : null}
      {((userAnswers.length === TOTAL_QUES)) ? <p className='text-2xl mt-10 text-center'><span className='text-purple-700 font-bold'>FinalScore: </span> {finalScore}</p> : null}



      {loading &&
        <p className='text-purple-700 font-sedan text-center text-3xl'>Loading Questions...</p>
      }

      {(!loading && !gameOver && !(userAnswers.length === TOTAL_QUES))  ? (
        <QuestionCard
          questionNum={number + 1}
          totalQues={TOTAL_QUES}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />
      ): null}

      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUES - 1 ? (
        <button className='px-3 py-2 mt-4 text-montserrat text-lg rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white scale-105 duration-75 ' onClick={nextQuestion}>Next Question</button>
      ) : null}

      
      </div>
    </div>
  );
}

export default App;
