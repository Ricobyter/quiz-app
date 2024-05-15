import React from 'react'
import { AnswerObject } from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQues: number
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQues }) => (
    <div className='font-montserrat w-100vw flex flex-col justify-center items-center'>
        {/* <p className='number'>
            Question : {questionNum} / {totalQues}
        </p> */}
      <div className='flex w-[100vw] items-center justify-center'>

        <p className='text-2xl w-[90vw] lg:w-[50vw] bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-gray-500 px-4 py-3 rounded-xl mb-8  shadow-md text-center' dangerouslySetInnerHTML={{ __html: question }} />
      </div>
        <div className='grid grid-cols-2 gap-4 text-white w-[90vw] lg:w-full'>
        {answers.map((answer, index) => (
        <div key={index} className="mb-4 w-full">
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
            className={`w-full bg-gradient-to-r ${
              userAnswer?.correctAnswer === answer
                ? 'from-green-400 to-green-600'
                : userAnswer?.answer === answer
                ? 'from-red-400 to-red-600'
                : 'from-purple-600 to-purple-500'
            } text-white font-semibold py-2 px-4 rounded-lg cursor-pointer`}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
        </div>
    </div>
)

export default QuestionCard;
