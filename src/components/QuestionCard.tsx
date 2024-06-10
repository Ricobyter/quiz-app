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
    <div className='font-montserrat w-[90%] md:w-[80%] flex flex-col justify-center items-center p-4 rounded-xl '>
      <div className='flex w-full items-center justify-center'>

        <p className='text-xl font-semibold lg:w-[50vw] bg-gradient-to-r text-blue-500  border-2 border-orange-700 bg-stone-100 rounded-xl  px-4 py-3  mb-8   text-center' dangerouslySetInnerHTML={{ __html: question }} />
      </div>
        <div className='flex flex-col gap-1  text-white w-full lg:w-full'>
        {answers.map((answer, index) => (
        <div key={index} className="mb-1 w-full">
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
            className={`w-full bg-gradient-to-r ${
              userAnswer?.correctAnswer === answer
                ? 'from-green-300 to-green-400'
                : userAnswer?.answer === answer
                ? 'from-red-300 to-red-400'
                : ''
            } font-semibold py-2 px-4 rounded-lg cursor-pointer text-blue-500  border-2 border-orange-700 bg-stone-100`}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
        </div>
    </div>
)

export default QuestionCard;
