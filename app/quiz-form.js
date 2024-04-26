import { revalidatePath } from "next/cache";
import { sql } from "./db";

function Answer({ id }) {
    return (
        <>
            <label>
                <input className="border mt-2 ml-2" name={`answer-${id}`} placeholder={`Answer ${id}`}>
                </input>
                <input type="checkbox" className="ml-2" name={`check-${id}`}>
                </input>
            </label>
        </>
    )
}
export default function QuizForm() {
    async function createQuiz(formData) {
        'use server'
        let title = formData.get('title')
        let description = formData.get('description')
        let question = formData.get('question')
        let answers = [1, 2, 3].map((id) => {
            return {
                answer: formData.get(`answer-${id}`),
                isCorrect: formData.get(`check-${id}`) === 'on'
            }
        })
        await sql`
            WITH new_quiz AS (
                INSERT INTO
                    quizzes
                    (title, description, question_text)
                VALUES
                    (${title}, ${description}, ${question})
                RETURNING
                    quiz_id
            )
            INSERT INTO
                answers
                (quiz_id, answer_text, is_correct)
            VALUES
                (
                    (SELECT quiz_id FROM new_quiz),
                    ${answers[0].answer},
                    ${answers[0].isCorrect}
                ),
                (
                    (SELECT quiz_id FROM new_quiz),
                    ${answers[1].answer},
                    ${answers[1].isCorrect}
                ),
                (
                    (SELECT quiz_id FROM new_quiz),
                    ${answers[2].answer},
                    ${answers[2].isCorrect}
                )
        `;
        revalidatePath('/')        
    }
    return (
        <>
            <h3 className="bg-blue-400 mt-4 w-fit p-1 border-4">Add Quiz</h3>
            <form className="flex flex-col" action={createQuiz}>
                <label>
                    <input name="title" className="border mt-2 ml-2" placeholder="Title"></input>
                </label>
                <label>
                    <input name="description" className="border mt-2 ml-2" placeholder="Description"></input>
                </label>
                <label>
                    <input name="question" className="border mt-2 ml-2" placeholder="Question"></input>
                </label>
                <Answer id={1} />
                <Answer id={2} />
                <Answer id={3} />
                <button className="border-4 w-fit px-2 py-1 m-2 bg-green-600">Add</button>
            </form>
        </>

    )
}