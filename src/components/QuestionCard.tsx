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
    <div className='font-montserrat w-[90vw] flex flex-col justify-center items-center p-4 rounded-xl bg-purple-800'>
        {/* <p className='number'>
            Question : {questionNum} / {totalQues}
        </p> */}
      <div className='flex w-full items-center justify-center'>

        <p className='text-2xl lg:w-[50vw] bg-gradient-to-r from-purple-600 to-purple-500 text-white  px-4 py-3 rounded-md mb-8   text-center' dangerouslySetInnerHTML={{ __html: question }} />
      </div>
        <div className='flex flex-col gap-2  text-white w-full lg:w-full'>
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
