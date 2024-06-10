import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//images
import quiz from './images/quiz.png'

//Types
import { QuestionState, Difficulty } from './API';
import Result from './components/Result';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const DEFAULT_TOTAL_QUES = 5;

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true)
  // const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)
  const [difficultyLevel, setDifficultyLevel] = useState(Difficulty.EASY);
  const [selectedTotalQues, setSelectedTotalQues] = useState(DEFAULT_TOTAL_QUES);// Default total questions

  // console.log(fetchQuizQuestions(selectedTotalQues, Difficulty.EASY))
  console.log(questions)


  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setShowStartButton(false)

    const newQuestions = await fetchQuizQuestions(
      selectedTotalQues, difficultyLevel
    )

    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false);
    // setFinalScore(0)

  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      //Check if the answer is correct
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1)
        // setFinalScore(prev => prev + 1)
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
    if (nextQuestion === selectedTotalQues) {
      setGameOver(true)
      setSelectedTotalQues(DEFAULT_TOTAL_QUES)
    }
    else {
      setNumber(nextQuestion)
    }
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyLevel(e.target.value as Difficulty);
  };

  const handleTotalQuesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTotalQues(parseInt(e.target.value));
  };

  if(gameOver && userAnswers.length === selectedTotalQues){
    return (
      

      <Result 
      score = {score}
      totalQues={selectedTotalQues}/>
      
    )
  }

  return (
    <div className="text-white flex justify-center items-center flex-col  h-[100vh] w-[100vw] bg-blue-300" >
      {(userAnswers.length !== selectedTotalQues)&&(
        <div className='max-md:mt-[4rem] mb-8 md:mb-14'>
          <img src={quiz} alt='quiz image' className='w-[10rem] h-[10rem] bg-center '/>
        </div>
        )}
      <div className='w-full  md:w-[50vw] text-blue-600 h-full md:h-[50vh]'>

      {/* {gameOver || userAnswers.length === selectedTotalQues ? ( */}
  <div className={`flex flex-col mt-24 lg:mt-0 gap-4 justify-center items-center ${showStartButton ? '' : 'hidden'}`}>
<div className='flex flex-col gap-3'>
  <div className=" flex  gap-6">
    <label htmlFor="difficulty" className='text-xl font-montserrat font-semibold'>Difficulty</label>
    <select id="difficulty" className="bg-stone-200 rounded-md outline-none" onChange={handleDifficultyChange}>
      <option value={Difficulty.EASY}>Easy</option>
      <option value={Difficulty.MEDIUM}>Medium</option>
      <option value={Difficulty.HARD}>Hard</option>
    </select>
  </div>
  <div className="flex justify-between">
    <label htmlFor="totalQues" className='text-xl font-montserrat font-semibold'>Questions</label>
    <select id="totalQues" className="bg-stone-200 rounded-md outline-none" onChange={handleTotalQuesChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      {/* Add more options as needed */}
    </select>
  </div>
  </div>
  <button className="px-3 py-2 rounded-xl bg-blue-700 font-montserrat text-stone-200 text-xl hover:bg-blue-600 hover:scale-105 hover:text- duration-100 ease-in-out" onClick={startQuiz}>
    Start Quiz
  </button>
</div>

{userAnswers.length === selectedTotalQues && (
        <Result 
        score = {score}
        totalQues={selectedTotalQues}/>
)}
      
      {loading &&
        <p className='text-blue-700 font-sedan text-center text-3xl'>Loading Questions...</p>
      }
      <div className='w-full flex justify-center items-center'>

     
      {(!loading && !gameOver && !(userAnswers.length === selectedTotalQues))  ? (
        <QuestionCard
          questionNum={number + 1}
          totalQues={selectedTotalQues}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />
      ): null}
       </div>

      <div className='w-full flex justify-center items-center'>

      {!loading && !gameOver && userAnswers.length === number + 1 && number !== selectedTotalQues - 1 ? (
        <button className='px-3 py-2 mt-4 text-montserrat text-lg rounded-lg text-stone-200 hover:text-stone-100 bg-blue-700 hover:bg-blue-600 scale-105 duration-75 ' onClick={nextQuestion}>Next Question</button>
        ) : null}
      </div>


      
      </div>
    </div>
  );
}

export default App;
