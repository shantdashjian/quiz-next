import Link from "next/link"
import { redirect } from "next/navigation"
import { sql } from "../../db";


async function Quiz({id, show}) {
    const answers = await sql`
        SELECT
            q.quiz_id,
            q.title as quiz_title,
            q.description as quiz_description,
            q.question_text as quiz_question,
            a.answer_id,
            a.answer_text,
            a.is_correct
        FROM quizzes as q
        JOIN answers as a
        ON q.quiz_id = a.quiz_id
        WHERE q.quiz_id = ${id};
    `;

    return (
        <div>
            <h1 className="bg-green-100 w-fit border-4 border-green-900 p-1">{answers[0].quiz_title}</h1>
            <p className="bg-green-100 w-fit border-green-900 p-1">{answers[0].quiz_description}</p>
            <p className="bg-blue-400">{answers[0].quiz_question}</p>
            <ul>
                {answers.map((answer) => (
                    <li key={answer.answer_id} className="bg-blue-200">
                        <p>
                            {answer.answer_text}
                            {show === 'true' && answer.is_correct  ? <span className=" ml-2">✅</span> : null}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default function QuizPage({ params, searchParams }) {
    let id = params.id.split(".")[0];
    return (
        <section>
            <Quiz id={id} show={searchParams.show}/>
            <form className="mb-2" action={ async () =>{
                'use server';
                redirect(`/quiz/${id}?show=true`);
            }

            }>
                <button className="bg-green-600 p-2 border-4 mt-2">Show Answer</button>
            </form>
            <Link className="border-4 bg-blue-400 p-2" href={"/"}>Go Back</Link>
        </section>
    )
}