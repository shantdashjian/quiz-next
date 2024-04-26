import Link from "next/link";
import QuizForm from "./quiz-form";
import { sql } from "./db";

async function Quizzes() {
  const quizzes = await sql`
    SELECT * FROM quizzes
  `
  return (
    <ul>
      {quizzes.map(quiz => (
        <li key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))

      }
    </ul>
  )
}
export default function Home() {
  return (
    <section>
      <h1 className="bg-green-100 w-fit border-4 border-green-900 p-1">All Quizzes</h1>
      <Quizzes />
      <QuizForm />
    </section>
  );
}
