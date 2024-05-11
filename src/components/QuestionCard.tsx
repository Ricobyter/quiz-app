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
    <div>
        {/* <p className='number'>
            Question : {questionNum} / {totalQues}
        </p> */}
        <p className='text-2xl w-[50vw] bg-purple-700 text-white border-purple-600 px-4 py-3 rounded-xl mb-8 border-4 shadow-xl' dangerouslySetInnerHTML={{ __html: question }} />
        <div className='grid grid-cols-2 gap-6'>
            {answers.map(answer => (
                <div key={answer} >
                    <button className='bg-red-500 w-full py-2 rounded-xl' disabled={userAnswer ? true : false} value={answer} onClick={callback} >
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard;
