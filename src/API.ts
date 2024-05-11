import { shuffleArray } from "./utils";

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string;
}

export type QuestionState = Question &{
    answers: string[] 
}

export enum Difficulty{
    EASY = "easy",
    MEDIUM  = "medium",
    HARD = "hard"
}
// export const fetchQuizQuestions = async(amount:number, difficulty:Difficulty) => {
//     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
//     const data = await (await fetch(endpoint)).json();
    
//     return data.results.map((question: Question) => (
//         {
//             ...question,
//             answers: shuffleArray([...question.incorrect_answers
//                 , question.correct_answer
//             ])
//         }
//     ))
// }

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch quiz questions');
        }
        
        const data = await response.json();
        
        if (!data.results || !Array.isArray(data.results)) {
            throw new Error('Unexpected API response format');
        }
        
        return data.results.map((question: Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }));
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return []; // Return empty array or handle error in your application logic
    }
};

